// React / router
import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
// Image
import notCover from "../../assets/not-cover.png";
// React Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
// React components
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Container from "react-bootstrap/Container";
// Hooks
import useRedirect from "../../hooks/useRedirect";
// Notifications
import { NotificationManager } from "react-notifications";
// API
import { axiosReq } from "../../api/axiosDefaults";
// Styles
import styles from "../../styles/BookEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const BookEditForm = () => {
  // Using the useRedirect hook to redirect if the user is logged out
  useRedirect("loggedOut");
  // Setting the initial state of the errors and dateOfPub(lication) object to an empty object
  const [errors, setErrors] = useState({});
  const { dateOfPub, setDateOfPub } = useState(new Date());
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  const { id, newtitle } = useParams();
  // Setting the initial state of the bookData object with empty strings for the fields
  const [bookData, setBookData] = useState({
    title: newtitle ? newtitle : "",
    auth: "",
    pub_date: "",
    publisher: "",
    pages_no: "",
    isbn: "",
    lang_orig: "",
    lang: "",
    translators: "",
    genre: "",
    synopsis: "",
    cover: "",
  });
  const imageFile = useRef();
  // Destructuring the values from the profileData object
  const {
    title,
    auth,
    pub_date,
    publisher,
    pages_no,
    isbn,
    lang_orig,
    lang,
    translators,
    genre,
    synopsis,
    cover,
  } = bookData;

  useEffect(() => {
    // Update the init values of Book with API request
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/books/${id}/`);
        const {
          title,
          auth,
          pub_date,
          publisher,
          pages_no,
          isbn,
          lang_orig,
          lang,
          translators,
          genre,
          synopsis,
          cover,
        } = data;

        // Update the useState obj with request values
        setBookData({
          title,
          auth,
          pub_date,
          publisher,
          pages_no,
          isbn,
          lang_orig,
          lang,
          translators,
          genre,
          synopsis,
          cover,
        });

        // setDateOfPub(new Date(pub_date));
        console.log(data);
      } catch (err) {
        console.log(err);
        history.push("/books");
      }
    };

    //If thereis a ID will take the init value of the request API
    //if there is not ID value, will start with empty values (createBookForm)
    id && handleMount();
  }, [history, id]);

  // Handling input changes and updating the setBookData object
  const handleChange = (event) => {
    setBookData({
      ...bookData,
      [event.target.name]: event.target.value,
    });
  };
  const handleDateChange = (date) => {
    setDateOfPub(date);
    setBookData({
      ...bookData,
      pub_date: date.toISOString().split("T")[0],
    });
  };

  // Handling the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("auth", auth);
    formData.append("pub_date", dateOfPub);
    formData.append("publisher", publisher);
    formData.append("pages_no", pages_no);
    formData.append("isbn", isbn);
    formData.append("lang_orig", lang_orig);
    formData.append("lang", lang);
    formData.append("translators", translators);
    formData.append("genre", genre);
    formData.append("synopsis", synopsis);
    // formData.append("cover", cover);
    if (imageFile?.current?.files[0]) {
      formData.append("cover", imageFile?.current?.files[0]);
    }
    // Append the data and request the book request from the API
    try {
      const { data } = await axiosReq.put("/books/", formData);
      history.push(`/books/${data.id}`);
      // Display success notification
      NotificationManager.success("Book updated", "Success!");
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        // Display error notification
        NotificationManager.error("There was an issue adding your post", err);
      }
    }
  };

  const languagesOptions = (
    <>
      <option value="">Choose location</option>
      <option value="Afar">Afar</option>
      <option value="Abkhazian">Abkhazian</option>
      <option value="Afrikaans">Afrikaans</option>
      <option value="Akan">Akan</option>
      <option value="Albanian">Albanian</option>
      <option value="Amharic">Amharic</option>
      <option value="Arabic">Arabic</option>
      <option value="Aragonese">Aragonese</option>
      <option value="Armenian">Armenian</option>
      <option value="Assamese">Assamese</option>
      <option value="Avaric">Avaric</option>
      <option value="Avestan">Avestan</option>
      <option value="Aymara">Aymara</option>
      <option value="Azerbaijani">Azerbaijani</option>
      <option value="Bashkir">Bashkir</option>
      <option value="Bambara">Bambara</option>
      <option value="Basque">Basque</option>
      <option value="Belarusian">Belarusian</option>
      <option value="Bengali">Bengali</option>
      <option value="Bihari languages">Bihari languages</option>
      <option value="Bislama">Bislama</option>
      <option value="Tibetan">Tibetan</option>
      <option value="Bosnian">Bosnian</option>
      <option value="Breton">Breton</option>
      <option value="Bulgarian">Bulgarian</option>
      <option value="Burmese">Burmese</option>
      <option value="Catalan; Valencian">Catalan; Valencian</option>
      <option value="Czech">Czech</option>
      <option value="Chamorro">Chamorro</option>
      <option value="Chechen">Chechen</option>
      <option value="Chinese">Chinese</option>
      <option value="Chuvash">Chuvash</option>
      <option value="Cornish">Cornish</option>
      <option value="Corsican">Corsican</option>
      <option value="Cree">Cree</option>
      <option value="Welsh">Welsh</option>
      <option value="Czech">Czech</option>
      <option value="Danish">Danish</option>
      <option value="German">German</option>
      <option value="Divehi; Dhivehi; Maldivian">
        Divehi; Dhivehi; Maldivian
      </option>
      <option value="Dutch; Flemish">Dutch; Flemish</option>
      <option value="Dzongkha">Dzongkha</option>
      <option value="Greek, Modern (1453-)">Greek, Modern (1453-)</option>
      <option value="English">English</option>
      <option value="Esperanto">Esperanto</option>
      <option value="Estonian">Estonian</option>
      <option value="Basque">Basque</option>
      <option value="Ewe">Ewe</option>
      <option value="Faroese">Faroese</option>
      <option value="Persian">Persian</option>
      <option value="Fijian">Fijian</option>
      <option value="Finnish">Finnish</option>
      <option value="French">French</option>
      <option value="Western Frisian">Western Frisian</option>
      <option value="Fulah">Fulah</option>
      <option value="Georgian">Georgian</option>
      <option value="German">German</option>
      <option value="Gaelic; Scottish Gaelic">Gaelic; Scottish Gaelic</option>
      <option value="Irish">Irish</option>
      <option value="Galician">Galician</option>
      <option value="Manx">Manx</option>
      <option value="Greek, Modern (1453-)">Greek, Modern (1453-)</option>
      <option value="Guarani">Guarani</option>
      <option value="Gujarati">Gujarati</option>
      <option value="Haitian; Haitian Creole">Haitian; Haitian Creole</option>
      <option value="Hausa">Hausa</option>
      <option value="Hebrew">Hebrew</option>
      <option value="Herero">Herero</option>
      <option value="Hindi">Hindi</option>
      <option value="Hiri Motu">Hiri Motu</option>
      <option value="Croatian">Croatian</option>
      <option value="Hungarian">Hungarian</option>
      <option value="Armenian">Armenian</option>
      <option value="Igbo">Igbo</option>
      <option value="Icelandic">Icelandic</option>
      <option value="Ido">Ido</option>
      <option value="Sichuan Yi; Nuosu">Sichuan Yi; Nuosu</option>
      <option value="Inuktitut">Inuktitut</option>
      <option value="Interlingue; Occidental">Interlingue; Occidental</option>
      <option value="Indonesian">Indonesian</option>
      <option value="Inupiaq">Inupiaq</option>
      <option value="Icelandic">Icelandic</option>
      <option value="Italian">Italian</option>
      <option value="Javanese">Javanese</option>
      <option value="Japanese">Japanese</option>
      <option value="Kalaallisut; Greenlandic">Kalaallisut; Greenlandic</option>
      <option value="Kannada">Kannada</option>
      <option value="Kashmiri">Kashmiri</option>
      <option value="Georgian">Georgian</option>
      <option value="Kanuri">Kanuri</option>
      <option value="Kazakh">Kazakh</option>
      <option value="Central Khmer">Central Khmer</option>
      <option value="Kikuyu; Gikuyu">Kikuyu; Gikuyu</option>
      <option value="Kinyarwanda">Kinyarwanda</option>
      <option value="Kirghiz; Kyrgyz">Kirghiz; Kyrgyz</option>
      <option value="Komi">Komi</option>
      <option value="Kongo">Kongo</option>
      <option value="Korean">Korean</option>
      <option value="Kuanyama; Kwanyama">Kuanyama; Kwanyama</option>
      <option value="Kurdish">Kurdish</option>
      <option value="Lao">Lao</option>
      <option value="Latin">Latin</option>
      <option value="Latvian">Latvian</option>
      <option value="Limburgan; Limburger; Limburgish">
        Limburgan; Limburger; Limburgish
      </option>
      <option value="Lingala">Lingala</option>
      <option value="Lithuanian">Lithuanian</option>
      <option value="Luxembourgish; Letzeburgesch">
        Luxembourgish; Letzeburgesch
      </option>
      <option value="Luba-Katanga">Luba-Katanga</option>
      <option value="Ganda">Ganda</option>
      <option value="Macedonian">Macedonian</option>
      <option value="Marshallese">Marshallese</option>
      <option value="Malayalam">Malayalam</option>
      <option value="Maori">Maori</option>
      <option value="Marathi">Marathi</option>
      <option value="Malay">Malay</option>
      <option value="Micmac">Micmac</option>
      <option value="Macedonian">Macedonian</option>
      <option value="Malagasy">Malagasy</option>
      <option value="Maltese">Maltese</option>
      <option value="Mongolian">Mongolian</option>
      <option value="Maori">Maori</option>
      <option value="Malay">Malay</option>
      <option value="Burmese">Burmese</option>
      <option value="Nauru">Nauru</option>
      <option value="Navajo; Navaho">Navajo; Navaho</option>
      <option value="Ndebele, South; South Ndebele">
        Ndebele, South; South Ndebele
      </option>
      <option value="Ndebele, North; North Ndebele">
        Ndebele, North; North Ndebele
      </option>
      <option value="Ndonga">Ndonga</option>
      <option value="Nepali">Nepali</option>
      <option value="Dutch; Flemish">Dutch; Flemish</option>
      <option value="Norwegian Nynorsk">Norwegian Nynorsk</option>
      <option value="Bokmål, Norwegian">Bokmål, Norwegian</option>
      <option value="Norwegian">Norwegian</option>
      <option value="Occitan (post 1500)">Occitan (post 1500)</option>
      <option value="Ojibwa">Ojibwa</option>
      <option value="Oriya">Oriya</option>
      <option value="Oromo">Oromo</option>
      <option value="Ossetian; Ossetic">Ossetian; Ossetic</option>
      <option value="Panjabi; Punjabi">Panjabi; Punjabi</option>
      <option value="Persian">Persian</option>
      <option value="Pali">Pali</option>
      <option value="Polish">Polish</option>
      <option value="Portuguese">Portuguese</option>
      <option value="Pushto; Pashto">Pushto; Pashto</option>
      <option value="Quechua">Quechua</option>
      <option value="Romansh">Romansh</option>
      <option value="Romanian; Moldavian; Moldovan">
        Romanian; Moldavian; Moldovan
      </option>
      <option value="Romanian; Moldavian; Moldovan">
        Romanian; Moldavian; Moldovan
      </option>
      <option value="Rundi">Rundi</option>
      <option value="Russian">Russian</option>
      <option value="Sango">Sango</option>
      <option value="Sanskrit">Sanskrit</option>
      <option value="Sinhala; Sinhalese">Sinhala; Sinhalese</option>
      <option value="Slovak">Slovak</option>
      <option value="Slovak">Slovak</option>
      <option value="Slovenian">Slovenian</option>
      <option value="Northern Sami">Northern Sami</option>
      <option value="Samoan">Samoan</option>
      <option value="Shona">Shona</option>
      <option value="Sindhi">Sindhi</option>
      <option value="Somali">Somali</option>
      <option value="Sotho, Southern">Sotho, Southern</option>
      <option value="Spanish; Castilian">Spanish; Castilian</option>
      <option value="Albanian">Albanian</option>
      <option value="Sardinian">Sardinian</option>
      <option value="Serbian">Serbian</option>
      <option value="Swati">Swati</option>
      <option value="Sundanese">Sundanese</option>
      <option value="Swahili">Swahili</option>
      <option value="Swedish">Swedish</option>
      <option value="Tahitian">Tahitian</option>
      <option value="Tamil">Tamil</option>
      <option value="Tatar">Tatar</option>
      <option value="Telugu">Telugu</option>
      <option value="Tajik">Tajik</option>
      <option value="Tagalog">Tagalog</option>
      <option value="Thai">Thai</option>
      <option value="Tibetan">Tibetan</option>
      <option value="Tigrinya">Tigrinya</option>
      <option value="Tonga (Tonga Islands)">Tonga (Tonga Islands)</option>
      <option value="Tswana">Tswana</option>
      <option value="Tsonga">Tsonga</option>
      <option value="Turkmen">Turkmen</option>
      <option value="Turkish">Turkish</option>
      <option value="Twi">Twi</option>
      <option value="Uighur; Uyghur">Uighur; Uyghur</option>
      <option value="Ukrainian">Ukrainian</option>
      <option value="Urdu">Urdu</option>
      <option value="Uzbek">Uzbek</option>
      <option value="Venda">Venda</option>
      <option value="Vietnamese">Vietnamese</option>
      <option value="Volapük">Volapük</option>
      <option value="Welsh">Welsh</option>
      <option value="Walloon">Walloon</option>
      <option value="Wolof">Wolof</option>
      <option value="Xhosa">Xhosa</option>
      <option value="Yiddish">Yiddish</option>
      <option value="Yoruba">Yoruba</option>
      <option value="Zhuang; Chuang">Zhuang; Chuang</option>
      <option value="Chinese">Chinese</option>
      <option value="Zulu">Zulu</option>
    </>
  );

  const textFields = (
    <div className="text-center">
      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Author
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="auth"
            value={auth}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.auth?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={5}>
          Publication date
        </Form.Label>
        <Col sm={10}>
          <DatePicker
            selected={dateOfPub}
            name="pub_date"
            value={pub_date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            rows={7}
            placeholder=""
          />
        </Col>
      </Form.Group>

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Publisher
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={6}
            name="publisher"
            value={publisher}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.publisher?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Pages
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="pages_no"
            value={pages_no}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.pages_no?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          ISBN
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="isbn"
            value={isbn}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.isbn?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={5}>
          Language orig.
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={lang_orig}
            onChange={handleChange}
            name="lang_orig"
            rows={7}
            placeholder=""
          >
            {languagesOptions}
          </Form.Control>
        </Col>
      </Form.Group>
      {errors?.lang_orig?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Language
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            value={lang}
            onChange={handleChange}
            name="lang"
            rows={7}
            placeholder=""
          >
            {languagesOptions}
          </Form.Control>
        </Col>
      </Form.Group>
      {errors?.lang?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Translators
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="translators"
            value={translators}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.translators?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Genre
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="genre"
            value={genre}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.genre?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="text-left">
        <Form.Label column sm={2}>
          Synopsis
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            rows={6}
            name="synopsis"
            value={synopsis}
            onChange={handleChange}
            placeholder=""
          />
        </Col>
      </Form.Group>
      {errors?.synopsis?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        {id ? "update" : "create"}
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={4} lg={5}>
          <Container className={`${appStyles.Content} ${styles.Container}`}>
            <Form.Group>
              {cover ? (
                <figure>
                  <Image src={cover} fluid />
                </figure>
              ) : (
                <figure>
                  <Image src={notCover} fluid />
                </figure>
              )}
              {/* Displaying any errors with the cover */}
              {errors?.cover?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the cover
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setBookData({
                      ...bookData,
                      cover: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className={`${styles.TextFieldsContainer} d-md-none`}>
              {textFields}
            </div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container
            className={`${styles.TextFieldsContainer} ${appStyles.Content}`}
          >
            {textFields}
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default BookEditForm;
