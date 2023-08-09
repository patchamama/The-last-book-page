from django.db import models
from django.contrib.auth.models import User

LANGUAGES = [
        ('Afar', 'Afar'),
        ('Abkhazian', 'Abkhazian'),
        ('Afrikaans', 'Afrikaans'),
        ('Akan', 'Akan'),
        ('Albanian', 'Albanian'),
        ('Amharic', 'Amharic'),
        ('Arabic', 'Arabic'),
        ('Aragonese', 'Aragonese'),
        ('Armenian', 'Armenian'),
        ('Assamese', 'Assamese'),
        ('Avaric', 'Avaric'),
        ('Avestan', 'Avestan'),
        ('Aymara', 'Aymara'),
        ('Azerbaijani', 'Azerbaijani'),
        ('Bashkir', 'Bashkir'),
        ('Bambara', 'Bambara'),
        ('Basque', 'Basque'),
        ('Belarusian', 'Belarusian'),
        ('Bengali', 'Bengali'),
        ('Bihari languages', 'Bihari languages'),
        ('Bislama', 'Bislama'),
        ('Tibetan', 'Tibetan'),
        ('Bosnian', 'Bosnian'),
        ('Breton', 'Breton'),
        ('Bulgarian', 'Bulgarian'),
        ('Burmese', 'Burmese'),
        ('Catalan; Valencian', 'Catalan; Valencian'),
        ('Czech', 'Czech'),
        ('Chamorro', 'Chamorro'),
        ('Chechen', 'Chechen'),
        ('Chinese', 'Chinese'),
        ('Chuvash', 'Chuvash'),
        ('Cornish', 'Cornish'),
        ('Corsican', 'Corsican'),
        ('Cree', 'Cree'),
        ('Welsh', 'Welsh'),
        ('Czech', 'Czech'),
        ('Danish', 'Danish'),
        ('German', 'German'),
        ('Divehi; Dhivehi; Maldivian', 'Divehi; Dhivehi; Maldivian'),
        ('Dutch; Flemish', 'Dutch; Flemish'),
        ('Dzongkha', 'Dzongkha'),
        ('Greek, Modern (1453-)', 'Greek, Modern (1453-)'),
        ('English', 'English'),
        ('Esperanto', 'Esperanto'),
        ('Estonian', 'Estonian'),
        ('Basque', 'Basque'),
        ('Ewe', 'Ewe'),
        ('Faroese', 'Faroese'),
        ('Persian', 'Persian'),
        ('Fijian', 'Fijian'),
        ('Finnish', 'Finnish'),
        ('French', 'French'),
        ('Western Frisian', 'Western Frisian'),
        ('Fulah', 'Fulah'),
        ('Georgian', 'Georgian'),
        ('German', 'German'),
        ('Gaelic; Scottish Gaelic', 'Gaelic; Scottish Gaelic'),
        ('Irish', 'Irish'),
        ('Galician', 'Galician'),
        ('Manx', 'Manx'),
        ('Greek, Modern (1453-)', 'Greek, Modern (1453-)'),
        ('Guarani', 'Guarani'),
        ('Gujarati', 'Gujarati'),
        ('Haitian; Haitian Creole', 'Haitian; Haitian Creole'),
        ('Hausa', 'Hausa'),
        ('Hebrew', 'Hebrew'),
        ('Herero', 'Herero'),
        ('Hindi', 'Hindi'),
        ('Hiri Motu', 'Hiri Motu'),
        ('Croatian', 'Croatian'),
        ('Hungarian', 'Hungarian'),
        ('Armenian', 'Armenian'),
        ('Igbo', 'Igbo'),
        ('Icelandic', 'Icelandic'),
        ('Ido', 'Ido'),
        ('Sichuan Yi; Nuosu', 'Sichuan Yi; Nuosu'),
        ('Inuktitut', 'Inuktitut'),
        ('Interlingue; Occidental', 'Interlingue; Occidental'),
        ('Indonesian', 'Indonesian'),
        ('Inupiaq', 'Inupiaq'),
        ('Icelandic', 'Icelandic'),
        ('Italian', 'Italian'),
        ('Javanese', 'Javanese'),
        ('Japanese', 'Japanese'),
        ('Kalaallisut; Greenlandic', 'Kalaallisut; Greenlandic'),
        ('Kannada', 'Kannada'),
        ('Kashmiri', 'Kashmiri'),
        ('Georgian', 'Georgian'),
        ('Kanuri', 'Kanuri'),
        ('Kazakh', 'Kazakh'),
        ('Central Khmer', 'Central Khmer'),
        ('Kikuyu; Gikuyu', 'Kikuyu; Gikuyu'),
        ('Kinyarwanda', 'Kinyarwanda'),
        ('Kirghiz; Kyrgyz', 'Kirghiz; Kyrgyz'),
        ('Komi', 'Komi'),
        ('Kongo', 'Kongo'),
        ('Korean', 'Korean'),
        ('Kuanyama; Kwanyama', 'Kuanyama; Kwanyama'),
        ('Kurdish', 'Kurdish'),
        ('Lao', 'Lao'),
        ('Latin', 'Latin'),
        ('Latvian', 'Latvian'),
        ('Limburgan; Limburger; Limburgish', 'Limburgan; Limburger; Limburgish'),
        ('Lingala', 'Lingala'),
        ('Lithuanian', 'Lithuanian'),
        ('Luxembourgish; Letzeburgesch', 'Luxembourgish; Letzeburgesch'),
        ('Luba-Katanga', 'Luba-Katanga'),
        ('Ganda', 'Ganda'),
        ('Macedonian', 'Macedonian'),
        ('Marshallese', 'Marshallese'),
        ('Malayalam', 'Malayalam'),
        ('Maori', 'Maori'),
        ('Marathi', 'Marathi'),
        ('Malay', 'Malay'),
        ('Micmac', 'Micmac'),
        ('Macedonian', 'Macedonian'),
        ('Malagasy', 'Malagasy'),
        ('Maltese', 'Maltese'),
        ('Mongolian', 'Mongolian'),
        ('Maori', 'Maori'),
        ('Malay', 'Malay'),
        ('Burmese', 'Burmese'),
        ('Nauru', 'Nauru'),
        ('Navajo; Navaho', 'Navajo; Navaho'),
        ('Ndebele, South; South Ndebele', 'Ndebele, South; South Ndebele'),
        ('Ndebele, North; North Ndebele', 'Ndebele, North; North Ndebele'),
        ('Ndonga', 'Ndonga'),
        ('Nepali', 'Nepali'),
        ('Dutch; Flemish', 'Dutch; Flemish'),
        ('Norwegian Nynorsk', 'Norwegian Nynorsk'),
        ('Bokmål, Norwegian', 'Bokmål, Norwegian'),
        ('Norwegian', 'Norwegian'),
        ('Occitan (post 1500)', 'Occitan (post 1500)'),
        ('Ojibwa', 'Ojibwa'),
        ('Oriya', 'Oriya'),
        ('Oromo', 'Oromo'),
        ('Ossetian; Ossetic', 'Ossetian; Ossetic'),
        ('Panjabi; Punjabi', 'Panjabi; Punjabi'),
        ('Persian', 'Persian'),
        ('Pali', 'Pali'),
        ('Polish', 'Polish'),
        ('Portuguese', 'Portuguese'),
        ('Pushto; Pashto', 'Pushto; Pashto'),
        ('Quechua', 'Quechua'),
        ('Romansh', 'Romansh'),
        ('Romanian; Moldavian; Moldovan', 'Romanian; Moldavian; Moldovan'),
        ('Romanian; Moldavian; Moldovan', 'Romanian; Moldavian; Moldovan'),
        ('Rundi', 'Rundi'),
        ('Russian', 'Russian'),
        ('Sango', 'Sango'),
        ('Sanskrit', 'Sanskrit'),
        ('Sinhala; Sinhalese', 'Sinhala; Sinhalese'),
        ('Slovak', 'Slovak'),
        ('Slovak', 'Slovak'),
        ('Slovenian', 'Slovenian'),
        ('Northern Sami', 'Northern Sami'),
        ('Samoan', 'Samoan'),
        ('Shona', 'Shona'),
        ('Sindhi', 'Sindhi'),
        ('Somali', 'Somali'),
        ('Sotho, Southern', 'Sotho, Southern'),
        ('Spanish; Castilian', 'Spanish; Castilian'),
        ('Albanian', 'Albanian'),
        ('Sardinian', 'Sardinian'),
        ('Serbian', 'Serbian'),
        ('Swati', 'Swati'),
        ('Sundanese', 'Sundanese'),
        ('Swahili', 'Swahili'),
        ('Swedish', 'Swedish'),
        ('Tahitian', 'Tahitian'),
        ('Tamil', 'Tamil'),
        ('Tatar', 'Tatar'),
        ('Telugu', 'Telugu'),
        ('Tajik', 'Tajik'),
        ('Tagalog', 'Tagalog'),
        ('Thai', 'Thai'),
        ('Tibetan', 'Tibetan'),
        ('Tigrinya', 'Tigrinya'),
        ('Tonga (Tonga Islands)', 'Tonga (Tonga Islands)'),
        ('Tswana', 'Tswana'),
        ('Tsonga', 'Tsonga'),
        ('Turkmen', 'Turkmen'),
        ('Turkish', 'Turkish'),
        ('Twi', 'Twi'),
        ('Uighur; Uyghur', 'Uighur; Uyghur'),
        ('Ukrainian', 'Ukrainian'),
        ('Urdu', 'Urdu'),
        ('Uzbek', 'Uzbek'),
        ('Venda', 'Venda'),
        ('Vietnamese', 'Vietnamese'),
        ('Volapük', 'Volapük'),
        ('Welsh', 'Welsh'),
        ('Walloon', 'Walloon'),
        ('Wolof', 'Wolof'),
        ('Xhosa', 'Xhosa'),
        ('Yiddish', 'Yiddish'),
        ('Yoruba', 'Yoruba'),
        ('Zhuang; Chuang', 'Zhuang; Chuang'),
        ('Chinese', 'Chinese'),
        ('Zulu', 'Zulu')
    ]

class Book(models.Model):
    """
    Book model with content of books
    """

    title = models.CharField(max_length=150, unique=False)
    auth = models.CharField(max_length=150, unique=False)
    pub_date = models.DateTimeField(blank=True, null=True)
    publisher = models.CharField(max_length=100, unique=False, blank=True)
    pages_no = models.IntegerField(default=0)
    isbn = models.CharField(max_length=13, unique=True, blank=True)
    lang_orig = models.CharField(max_length=50, choices=LANGUAGES, blank=True)
    lang = models.CharField(max_length=50, choices=LANGUAGES, blank=True)
    translators = models.CharField(max_length=200, unique=False, blank=True)
    genre = models.TextField(blank=True)
    synopsis = models.TextField(blank=True)
    cover = models.ImageField(
        upload_to='images/', default='../No_image_available.svg_fqlc88.png', blank=True
    )
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="book_createdby", blank=True, null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="book_updatedby", blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return f'{self.id} {self.title} - {self.auth}'