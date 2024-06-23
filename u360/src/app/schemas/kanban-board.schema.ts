import zod from 'zod';
import { UserSchema } from './users.schema';

export const TaskSchema = zod.object({
  _id: zod.string(),
  title: zod.string(),
  description: zod.string(),
  status: zod.string(),
  assignee: UserSchema,
  index: zod.number(),
});

export const ColumnSchema = zod.object({
  title: zod.string(),
  tasks: zod.array(TaskSchema),
  addTask: zod.function().args(TaskSchema).returns(zod.array(TaskSchema)),
  removeTask: zod.function().args(zod.string()).returns(zod.array(TaskSchema)),
});

export const KanbanBoardSchema = zod.object({
  title: zod.string(),
  columns: zod.array(ColumnSchema),
  addColumn: zod.function().args(ColumnSchema).returns(zod.array(ColumnSchema)),
  removeColumn: zod.function().args(zod.string()).returns(zod.array(ColumnSchema)),
});
