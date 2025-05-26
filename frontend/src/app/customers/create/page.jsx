"use client";
import { useRef, useState} from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // 顧客を作成する関数
  async function createCustomer(data) {
  const res = await fetch("http://127.0.0.1:8000/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let errorMsg = "顧客作成に失敗しました";
    try {
      // サーバーからのエラーメッセージを取得
      const errorJson = await res.json();
      if (errorJson.detail) errorMsg = errorJson.detail;
    } catch (e) {
      // レスポンスがJSONでない場合はそのまま
    }
    throw new Error(errorMsg);
  }
}

  // フォーム送信時の処理
  const handleSubmit = async (event) => {
    event.preventDefault(); // ページのリロードを防ぐ
    setErrorMessage(""); // エラーをリセット

    // フォームから値を取り出す
    const form = formRef.current;
    const data = {
      customer_id: form.customer_id.value,
      customer_name: form.customer_name.value,
      age: Number(form.age.value),
      gender: form.gender.value,
    };

    // 入力チェック（IDや名前が空ならエラー）
    if (!data.customer_id || !data.customer_name) {
      setErrorMessage("IDと名前は必須です");
      return;
    }

    try {
      await createCustomer(data);
      router.push(`/customers/create/confirm?customer_id=${data.customer_id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="桃太郎"
                    className="input input-bordered"
                    style={{ color: "#f8e58c" }}
                  />
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  placeholder="C030"
                  className="input input-bordered"
                  style={{ color: "#f8e58c" }}
                />
              </p>
              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  placeholder="30"
                  className="input input-bordered"
                  style={{ color: "#f8e58c" }}
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  placeholder="女"
                  className="input input-bordered"
                  style={{ color: "#f8e58c" }}
                />
              </p>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary m-4 text-2xl">
                作成
              </button>
            </div>
          </form>
          {/* ここにエラーメッセージを表示 */}
          {errorMessage && (
            <div style={{ color: "red", margin: "1rem", textAlign: "center" }}>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
