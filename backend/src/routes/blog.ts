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
		c.status(404);
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
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
		log: ['query', 'info', 'warn', 'error']
	 }).$extends(withAccelerate());
	 
 
	// Check if the connection is working
	console.log('Connected to database:', c.env?.DATABASE_URL);
 
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
 
	return c.json({
	   posts
	});
 });

 blogRouter.get('/all-posts', async (c) => {
	const prisma = new PrismaClient({
	  datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  
	// Log to verify connection
	console.log('Connected to database:', c.env?.DATABASE_URL);
  
	// Fetch all posts without any selection or filtering
	const posts = await prisma.post.findMany();
	
	console.log('Fetched posts in /all-posts:', posts);  // Debug the fetched posts
  
	// Return the posts or an empty array if none are found
	return c.json({
	  posts: posts || []
	});
  });
  
  blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
	  datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  
	try {
	  const posts = await prisma.post.findMany();
  
	  console.log('Fetched posts:', posts);  // Log the fetched posts
  
	  return c.json({
		posts,
	  });
	} catch (error) {
	  console.error('Error fetching posts:', error);
	  return c.json({
		error: 'Failed to fetch posts',
	  });
	}
  });
  
  
  