"use server";
import { revalidatePath } from "next/cache";

const createCustomer = async (body) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Failed to create customer: " + errorText);
  }
};

  const body_msg = JSON.stringify({
    customer_name: creating_customer_name,
    customer_id: creating_customer_id,
    age: creating_age,
    gender: creating_gender,
  });

  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body_msg,
  });
  if (!res.ok) {
    throw new Error("Failed to create customer");
  }

  revalidatePath(`/customers`);


export default createCustomer;
