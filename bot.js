require('dotenv').config({path:'.env'})

const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TOKEN
const produk = process.env.PRODUCT
const customer = process.env.CUSTOMER
const bot = new TelegramBot(token, { polling: true})
const axios = require('axios')


bot.onText(/\/start|Hai|Hello|Assalamualaikum/, msg => {
    bot.sendMessage(msg.chat.id, `Hai ${msg.chat.first_name}, selamat datang di toko kami`)
    bot.sendMessage(msg.chat.id, `Silahkan lihat produk kami : /produk`)
    bot.sendMessage(msg.chat.id, `Jika ingin membaca tentang toko kami : /desc`)
});

bot.onText(/\/desc/, msg => {
    bot.sendMessage(msg.chat.id, `FearMan Shop adalah Jasa Desain Grafis Profesional, Cepat, Tepat waktu dan Berkualitas.`)
});

//this code user stil fail

// bot.onText(/\d/, msg => {
//     const {
//       text,
//       from: { username }
//     } = msg;
  
//     const [alamat, nama, email, nohp] = text.split("-");
  
//     const Daftar = () =>
//     axios.post(customer, {
//       data: {
//         attributes: {
//         full_name: alamat,
//         username: nama,
//         email: address,
//         phone_number: phone
//         }
//       }
//     }).then(res => {
//       bot.sendMessage(msg.chat.id,`Halo *${username}*, berhasil melakukan pendaftaran. Silahkan lakukan order /produk`,
//                   { parse_mode: "Markdown" });
//     }).catch(error => {
//     console.log(error);
//     });
//     axios.get(customer + id)
// 		.then(response => {
// 			if (!response.data.data) {
// 				addCustomer();
// 			}
// 			else {
// 				bot.sendMessage(
// 					msg.chat.id,
// 					`*${name}*, data anda sudah tersimpan. Silahkan lakukan order.`,
// 					{ parse_mode: "Markdown" }
// 				);
// 			}
// 		})
// 		.catch(err => {
// 			console.log(err.message);
// 		});
//   });


//fungsi bot ketika menampilkan produk
bot.onText(/\/produk/, msg =>{
    let chatid = msg.chat.id
    let inline_keyboard = (el) => [
        [
          {
            text: "Tambahkan ke keranjang",
            callback_data: JSON.stringify(el.cart)
          }
        ]
      ];
        
        axios.get(produk)
            .then(res=> {
                const data = res.data.data;
                
                data.forEach(el => {
                    let ini = {
                        cart: {
                            id: el.id,
                            // action: 'cart'
                        }
                    };
                    
                    bot.sendMessage(
                        msg.chat.id,
                        `
            *Nama Barang*: ${el.name}
            *Harga*: Rp ${el.price}
            `,
                        {
                            // reply_markup: {
                            //     inline_keyboard: inline_keyboard(ini)
                            // },
                            parse_mode: "Markdown"
                        }
                    );
                }
                );
            })
            .catch(error => {
                console.log(error.message);
            });
    });
   