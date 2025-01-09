import { Elysia } from "elysia";
import * as fs from 'fs';
import * as path from 'path';
import { GenerateSchedule } from "./generateSchedule";
import assignInterfaces from "./utils";


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
  .post("/generate", async (context) => {
    const parsedBody = await context.request.json();
    const subjects = assignInterfaces(parsedBody);
    console.log(subjects);
    const generateSchedule = new GenerateSchedule();
    generateSchedule.generate();
    return { message: "Schedule generated" };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);