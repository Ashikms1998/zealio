// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function fetchData() {
//     const response = await fetch(`${API_URL}/api/signup`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   }

//   export async function createUser(userData: any) {
//     const response = await fetch(`${API_URL}/api/users`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   }