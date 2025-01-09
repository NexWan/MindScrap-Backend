import { Elysia } from "elysia";
import * as fs from 'fs';
import * as path from 'path';

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/semester/:semester", ({ params: { semester } }) => {
    const filePath = path.resolve(__dirname, `../res/semesters/semestre_${semester}.json`);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } else {
      return { error: "File not found" };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);