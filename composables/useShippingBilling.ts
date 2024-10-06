// interface Data {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   address1: string;
//   address2: string;
//   company: string;
//   state: string;
//   postal: string;
//   city: string;
//   country: string;
//   email: string;
// }
// export async function useShippingBilling(data: Data) {
//   const firstName = ref<string>("");
//   const lastName = ref<string>("");
//   const address1 = ref<string>("");
//   const address2 = ref<string>("");
//   const city = ref<string>("");
//   const state = ref<string>("");
//   const country = ref<string>("");
//   const postal = ref<string>("");
//   const phone = ref<string>("");
//   const email = ref<string>("");
//   const company = ref<string>("");
//   const fetchData = () => {
//     if (data) {
//       firstName.value = data.firstName;
//       lastName.value = data.lastName;
//       address1.value = data.address1;
//       address2.value = data.address2;
//       city.value = data.city;
//       state.value = data.state;
//       postal.value = data.postal;
//       phone.value = data.phone;
//       company.value = data.company;
//       email.value = data.email;
//     }
//   }; 
//   return {
//     firstName,
//     lastName,
//     address1,
//     address2,
//     city,
//     state,
//     country,
//     postal,
//     phone,
//     email,
//     company,
//     fetchData
//   };
// }
