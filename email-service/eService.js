const nodemailer = require('nodemailer'); 

// Configuração do serviço de e-mail 
const transEmail = nodemailer.createTransport({ 
    service: 'gmail', // Use o serviço de e-mail de sua escolha 
    tokenPath: { 
      user: process.env.EMAIL_USER, // Seu e-mail definido nas variáveis de ambiente 
      pass: process.env.EMAIL_PASS  // Sua senha de e-mail definida nas variáveis de ambiente 
    } 
  }); 

 
// Função para enviar e-mails
const sendEmail = (to, subject, text) => {  
  // Cria um objeto com as opções do e-mail
  const mailOptions = { 
      from: process.env.EMAIL_USER, // O endereço de e-mail que envia a mensagem, obtido de variáveis de ambiente
      to, // Destinatário do e-mail
      subject, // Assunto do e-mail
      text // Corpo do e-mail
  }; 

  // Envia o e-mail usando a função 'sendMail' do objeto 'transEmail'
  transEmail.sendMail(mailOptions, (error, info) => { 
      // Se ocorrer um erro ao enviar o e-mail, loga o erro no console
      if (error) { 
          return console.log('Erro ao enviar e-mail:', error); 
      } 
      // Se o e-mail for enviado com sucesso, loga a resposta no console
      console.log('E-mail enviado:', info.response); 
  }); 
}; 

   
  module.exports = { sendEmail };