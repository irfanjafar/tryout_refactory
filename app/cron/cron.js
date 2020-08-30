module.exports = async (nodemailer) => {
  let configMail, transporter, emailTarget, mail;

  configMail = {
    service: "gmail",
    auth: {
      user: "irfanjafaralter@gmail.com",
      pass: "alternatif123",
    },
  };

  transporter = await nodemailer.createTransport(configMail);
  emailTarget = "irfanjafaralter";

  mail = {
    to: emailTarget,
    from: configMail.auth.user,
    subject: "Pesanan Diterima",
    html: `Pesanan kamu diterima, terimakasih`,
  };
  transporter.sendMail(mail);
};
