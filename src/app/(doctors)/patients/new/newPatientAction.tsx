"use server";

export type FormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  medications: string;
  healthHistory: string;
};

export async function action(data: FormData) {
  console.log(data);
}
