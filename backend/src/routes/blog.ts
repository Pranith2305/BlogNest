import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "../../../common/src";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId : string;
  }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
	const user = await  verify(authHeader, c.env.JWT_SECRET);
	if (user && typeof user.id === "string"){
		c.set("userId", user.id);
		 await next()
	} else { 
		c.status(404)
		return c.json({
			error: "You are  not logged in"
		})
	}
  });
  
  

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

blogRouter.put('/', async (c) => {
	const body = await c.req.json();
	const {success} = updatePostInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			msg : "Input is not correct"
		})
	}
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const blog = await prisma.post.update({
		where: {
			id: body.id
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.json({
		id : blog.id
	});
});

blogRouter.get('/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	const id = c.req.param('id')
	const posts = await prisma.post.findFirst({
		where : {
			id : id,
		}, select : {
			id : true,
			title: true,
			content: true,
			author : {
				select : {
					name : true
				}
			}
	}});

	return c.json({
		posts
	});
})

blogRouter.get('/bulk', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const posts = await prisma.post.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				author: {
					select: {
						name: true
					}
				}
			}
		});

		console.log('Fetched posts:', posts);  // Log the fetched posts

		if (posts.length === 0) {
			console.log('No posts found in the database.');
		}

		return c.json({
			posts
		});
	} catch (error) {
		console.error('Error fetching posts:', error);
		c.status(500);
		return c.json({
			error: 'Internal Server Error'
		});
	}
});
  