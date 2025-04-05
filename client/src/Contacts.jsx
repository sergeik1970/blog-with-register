function Contacts() {
    return (
      <div className="contacts_container">
        <h2>Контакты</h2>
        <p>Если у вас есть вопросы, предложения или вы хотите с нами связаться — напишите нам.</p>
  
        <div className="contact-info">
          <p><strong>Telegram:</strong> <a href="https://t.me/sergey_kdsv">@sergey_kdsv</a></p>
          <p><strong>Сайт:</strong> <a href="https://kdsv.ru/">kdsv.ru</a></p>
          <p><strong>Эл почта:</strong> <a href="mailto:sergey.m.kudashev@gmail.com">Написать обращение...</a></p>
        </div>
  
        {/* <form className="contact-form">
          <label htmlFor="name">Имя:</label>
          <input type="text" id="name" placeholder="Ваше имя" required />
  
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Ваш email" required />
  
          <label htmlFor="message">Сообщение:</label>
          <textarea id="message" rows="5" placeholder="Ваше сообщение..." required></textarea>
  
          <button type="submit">Отправить</button>
        </form> */}
      </div>
    );
  }
  
  export default Contacts;