import type { MethodDetails } from "../libs/types";

export const METHODS: MethodDetails[] = [
  {
    id: "period",
    label: "Last period",
    field: "First day of your last period",
    hint: "Cycle length is the number of days from one period to the next. 28 is the usual default.",
  },
  {
    id: "conception",
    label: "Conception date",
    field: "Date of conception",
    hint: "Conception usually happens about two weeks after the start of your last period.",
  },
  {
    id: "due",
    label: "Due date from scan",
    field: "Expected due date",
    hint: "Use this if your cycles are irregular or you don't know when you conceived. Enter the due date your early scan gave you and we'll count back 40 weeks.",
  },
];
