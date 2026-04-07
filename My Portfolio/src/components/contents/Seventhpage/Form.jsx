import "./Form.css";

const Form = () => {
  return (
   
<div className="form-card1">
  <div className="form-card2">
    <form className="form">
      <p className="form-heading">Drop a Message</p>

      <div className="form-field">
        <input required="" placeholder="Name" className="input-field" type="text" />
      </div>

      <div className="form-field">
        <input
          required=""
          placeholder="Email"
          className="input-field"
          type="email"
        />
      </div>

      <div className="form-field">
        <input
          required=""
          placeholder="Subject"
          className="input-field"
          type="text"
        />
      </div>

      <div className="form-field">
        <textarea
          required=""
          placeholder="Message"
          cols="30"
          rows="3"
          className="input-field"
        ></textarea>
      </div>

      <button className="sendMessage-btn">Send Message</button>
    </form>
  </div>
</div>

  );
};

export default Form;