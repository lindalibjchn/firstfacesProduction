# Generated by Django 2.2.3 on 2019-07-30 13:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='AudioError',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_index', models.SmallIntegerField()),
                ('intention', models.CharField(max_length=500, null=True)),
                ('typed', models.NullBooleanField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='NewsArticle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('link', models.URLField()),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='PermSentence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sentence', models.CharField(default='[]', max_length=300)),
                ('sentence_timestamp', models.DateTimeField(blank=True, null=True)),
                ('question', models.BooleanField(default=False)),
                ('judgement', models.CharField(blank=True, choices=[('C', 'correct'), ('B', 'better'), ('P', 'prompt'), ('M', 'mean_by'), ('I', 'incorrect'), ('D', 'dunno'), ('3', 'more_than_three')], max_length=1, null=True)),
                ('judgement_timestamp', models.DateTimeField(blank=True, null=True)),
                ('emotion', models.CharField(default='[0, 0]', max_length=12)),
                ('nod', models.NullBooleanField()),
                ('nodSpeed', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('nodAmount', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('surprise', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('indexes', models.CharField(blank=True, max_length=50, null=True)),
                ('correction', models.CharField(blank=True, max_length=300)),
                ('correction_timestamp', models.DateTimeField(blank=True, null=True)),
                ('whats_wrong', models.NullBooleanField()),
                ('whats_wrong_timestamp', models.DateTimeField(blank=True, null=True)),
                ('try_again', models.NullBooleanField()),
                ('try_again_timestamp', models.DateTimeField(blank=True, null=True)),
                ('show_correction', models.NullBooleanField()),
                ('show_correction_timestamp', models.DateTimeField(blank=True, null=True)),
                ('next_sentence', models.NullBooleanField()),
                ('next_sentence_timestamp', models.DateTimeField(blank=True, null=True)),
                ('prompt', models.CharField(blank=True, default=None, max_length=300, null=True)),
                ('prompt_timestamp', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('learner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField(blank=True, null=True)),
                ('learner_emotion', models.CharField(blank=True, max_length=12, null=True)),
                ('topic', models.CharField(blank=True, max_length=100, null=True)),
                ('score', models.SmallIntegerField(blank=True, null=True)),
                ('tutorial', models.BooleanField(default=False)),
                ('learner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TempSentence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sentence', models.CharField(default='[]', max_length=300)),
                ('sentence_timestamp', models.DateTimeField(blank=True, null=True)),
                ('question', models.BooleanField(default=False)),
                ('judgement', models.CharField(blank=True, choices=[('C', 'correct'), ('P', 'prompt'), ('B', 'better'), ('M', 'mean_by'), ('I', 'incorrect'), ('D', 'dunno'), ('3', 'more_than_three')], max_length=1, null=True)),
                ('judgement_timestamp', models.DateTimeField(blank=True, null=True)),
                ('emotion', models.CharField(default='[0, 0]', max_length=12)),
                ('nod', models.NullBooleanField()),
                ('nodSpeed', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('nodAmount', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('surprise', models.DecimalField(decimal_places=1, default=0.0, max_digits=2)),
                ('indexes', models.CharField(blank=True, max_length=50, null=True)),
                ('correction', models.CharField(blank=True, max_length=300)),
                ('correction_timestamp', models.DateTimeField(blank=True, null=True)),
                ('whats_wrong', models.NullBooleanField()),
                ('whats_wrong_timestamp', models.DateTimeField(blank=True, null=True)),
                ('try_again', models.NullBooleanField()),
                ('try_again_timestamp', models.DateTimeField(blank=True, null=True)),
                ('show_correction', models.NullBooleanField()),
                ('show_correction_timestamp', models.DateTimeField(blank=True, null=True)),
                ('next_sentence', models.NullBooleanField()),
                ('next_sentence_timestamp', models.DateTimeField(blank=True, null=True)),
                ('prompt', models.CharField(blank=True, default=None, max_length=300, null=True)),
                ('prompt_timestamp', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('learner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('p_sentence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.PermSentence')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.Session')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nationality', models.CharField(choices=[['Afghanistan', 'Afghanistan'], ['Albania', 'Albania'], ['Algeria', 'Algeria'], ['American Samoa', 'American Samoa'], ['Andorra', 'Andorra'], ['Angola', 'Angola'], ['Anguilla', 'Anguilla'], ['Antarctica', 'Antarctica'], ['Antigua & Barbuda', 'Antigua & Barbuda'], ['Arab League', 'Arab League'], ['Argentina', 'Argentina'], ['Armenia', 'Armenia'], ['Aruba', 'Aruba'], ['Australia', 'Australia'], ['Austria', 'Austria'], ['Azerbaijan', 'Azerbaijan'], ['Bahamas', 'Bahamas'], ['Bahrain', 'Bahrain'], ['Bangladesh', 'Bangladesh'], ['Barbados', 'Barbados'], ['Belarus', 'Belarus'], ['Belgium', 'Belgium'], ['Belize', 'Belize'], ['Benin', 'Benin'], ['Bermuda', 'Bermuda'], ['Bhutan', 'Bhutan'], ['Bolivia', 'Bolivia'], ['Bosnia & Herzegovina', 'Bosnia & Herzegovina'], ['Botswana', 'Botswana'], ['Brazil', 'Brazil'], ['Brunei', 'Brunei'], ['Bulgaria', 'Bulgaria'], ['Burkina Faso', 'Burkina Faso'], ['Burundi', 'Burundi'], ['CARICOM', 'CARICOM'], ['CIS', 'CIS'], ['Cambodja', 'Cambodja'], ['Cameroon', 'Cameroon'], ['Canada', 'Canada'], ['Cape Verde', 'Cape Verde'], ['Cayman Islands', 'Cayman Islands'], ['Central African Republic', 'Central African Republic'], ['Chad', 'Chad'], ['Chile', 'Chile'], ['China', 'China'], ['Colombia', 'Colombia'], ['Comoros', 'Comoros'], ['Congo-Brazzaville', 'Congo-Brazzaville'], ['Congo-Kinshasa', 'Congo-Kinshasa'], ['Cook Islands', 'Cook Islands'], ['Costa Rica', 'Costa Rica'], ['Cote dIvoire', 'Cote dIvoire'], ['Croatia', 'Croatia'], ['Cuba', 'Cuba'], ['Cyprus', 'Cyprus'], ['Czech Republic', 'Czech Republic'], ['Denmark', 'Denmark'], ['Djibouti', 'Djibouti'], ['Dominica', 'Dominica'], ['Dominican Republic', 'Dominican Republic'], ['Ecuador', 'Ecuador'], ['Egypt', 'Egypt'], ['El Salvador', 'El Salvador'], ['Equatorial Guinea', 'Equatorial Guinea'], ['Eritrea', 'Eritrea'], ['Estonia', 'Estonia'], ['Ethiopia', 'Ethiopia'], ['Faroes', 'Faroes'], ['Fiji', 'Fiji'], ['Finland', 'Finland'], ['France', 'France'], ['Gabon', 'Gabon'], ['Gambia', 'Gambia'], ['Georgia', 'Georgia'], ['Germany', 'Germany'], ['Ghana', 'Ghana'], ['Gibraltar', 'Gibraltar'], ['Greece', 'Greece'], ['Greenland', 'Greenland'], ['Grenada', 'Grenada'], ['Guadeloupe', 'Guadeloupe'], ['Guademala', 'Guademala'], ['Guam', 'Guam'], ['Guernsey', 'Guernsey'], ['Guinea', 'Guinea'], ['Guinea-Bissau', 'Guinea-Bissau'], ['Guyana', 'Guyana'], ['Haiti', 'Haiti'], ['Honduras', 'Honduras'], ['Hungary', 'Hungary'], ['Iceland', 'Iceland'], ['India', 'India'], ['Indonesia', 'Indonesia'], ['Iran', 'Iran'], ['Iraq', 'Iraq'], ['Ireland', 'Ireland'], ['Israel', 'Israel'], ['Italy', 'Italy'], ['Jamaica', 'Jamaica'], ['Japan', 'Japan'], ['Jersey', 'Jersey'], ['Jordan', 'Jordan'], ['Kazakhstan', 'Kazakhstan'], ['Kenya', 'Kenya'], ['Kiribati', 'Kiribati'], ['Kosovo', 'Kosovo'], ['Kuwait', 'Kuwait'], ['Kyrgyzstan', 'Kyrgyzstan'], ['Laos', 'Laos'], ['Latvia', 'Latvia'], ['Lebanon', 'Lebanon'], ['Lesotho', 'Lesotho'], ['Liberia', 'Liberia'], ['Libya', 'Libya'], ['Liechtenstein', 'Liechtenstein'], ['Lithuania', 'Lithuania'], ['Luxembourg', 'Luxembourg'], ['Macao', 'Macao'], ['Macedonia', 'Macedonia'], ['Madagascar', 'Madagascar'], ['Malawi', 'Malawi'], ['Malaysia', 'Malaysia'], ['Maldives', 'Maldives'], ['Mali', 'Mali'], ['Malta', 'Malta'], ['Marshall Islands', 'Marshall Islands'], ['Martinique', 'Martinique'], ['Mauritania', 'Mauritania'], ['Mauritius', 'Mauritius'], ['Mexico', 'Mexico'], ['Micronesia', 'Micronesia'], ['Moldova', 'Moldova'], ['Monaco', 'Monaco'], ['Mongolia', 'Mongolia'], ['Montenegro', 'Montenegro'], ['Montserrat', 'Montserrat'], ['Morocco', 'Morocco'], ['Mozambique', 'Mozambique'], ['Myanmar[Burma]', 'Myanmar[Burma]'], ['NATO', 'NATO'], ['Namibia', 'Namibia'], ['Nauru', 'Nauru'], ['Nepal', 'Nepal'], ['Netherlands', 'Netherlands'], ['Netherlands Antilles', 'Netherlands Antilles'], ['New Caledonia', 'New Caledonia'], ['New Zealand', 'New Zealand'], ['Nicaragua', 'Nicaragua'], ['Niger', 'Niger'], ['Nigeria', 'Nigeria'], ['North Korea', 'North Korea'], ['Northern Cyprus', 'Northern Cyprus'], ['Norway', 'Norway'], ['Oman', 'Oman'], ['Pakistan', 'Pakistan'], ['Palau', 'Palau'], ['Palestine', 'Palestine'], ['Panama', 'Panama'], ['Papua New Guinea', 'Papua New Guinea'], ['Paraguay', 'Paraguay'], ['Peru', 'Peru'], ['Philippines', 'Philippines'], ['Poland', 'Poland'], ['Portugal', 'Portugal'], ['Puerto Rico', 'Puerto Rico'], ['Qatar', 'Qatar'], ['Reunion', 'Reunion'], ['Romania', 'Romania'], ['Russian Federation', 'Russian Federation'], ['Rwanda', 'Rwanda'], ['Saint Lucia', 'Saint Lucia'], ['Samoa', 'Samoa'], ['San Marino', 'San Marino'], ['Sao Tome & Principe', 'Sao Tome & Principe'], ['Saudi Arabia', 'Saudi Arabia'], ['Senegal', 'Senegal'], ['Serbia', 'Serbia'], ['Seyshelles', 'Seyshelles'], ['Sierra Leone', 'Sierra Leone'], ['Singapore', 'Singapore'], ['Slovakia', 'Slovakia'], ['Slovenia', 'Slovenia'], ['Solomon Islands', 'Solomon Islands'], ['Somalia', 'Somalia'], ['Somaliland', 'Somaliland'], ['South Afriica', 'South Afriica'], ['South Korea', 'South Korea'], ['Spain', 'Spain'], ['Sri Lanka', 'Sri Lanka'], ['St Kitts & Nevis', 'St Kitts & Nevis'], ['St Vincent & the Grenadines', 'St Vincent & the Grenadines'], ['Sudan', 'Sudan'], ['Suriname', 'Suriname'], ['Swaziland', 'Swaziland'], ['Sweden', 'Sweden'], ['Switzerland', 'Switzerland'], ['Syria', 'Syria'], ['Tahiti[French Polinesia]', 'Tahiti[French Polinesia]'], ['Taiwan', 'Taiwan'], ['Tajikistan', 'Tajikistan'], ['Tanzania', 'Tanzania'], ['Thailand', 'Thailand'], ['Timor-Leste', 'Timor-Leste'], ['Togo', 'Togo'], ['Tonga', 'Tonga'], ['Trinidad & Tobago', 'Trinidad & Tobago'], ['Tunisia', 'Tunisia'], ['Turkey', 'Turkey'], ['Turkmenistan', 'Turkmenistan'], ['Turks and Caicos Islands', 'Turks and Caicos Islands'], ['Tuvalu', 'Tuvalu'], ['Uganda', 'Uganda'], ['Ukraine', 'Ukraine'], ['United Arab Emirates', 'United Arab Emirates'], ['United Kingdom[Great Britain]', 'United Kingdom[Great Britain]'], ['United States of America', 'United States of America'], ['Uruguay', 'Uruguay'], ['Uzbekistan', 'Uzbekistan'], ['Vanutau', 'Vanutau'], ['Vatican City', 'Vatican City'], ['Venezuela', 'Venezuela'], ['Vietnam', 'Vietnam'], ['Virgin Islands British', 'Virgin Islands British'], ['Virgin Islands US', 'Virgin Islands US'], ['Western Sahara', 'Western Sahara'], ['Yemen', 'Yemen'], ['Zambia', 'Zambia'], ['Zimbabwe', 'Zimbabwe']], max_length=40, null=True)),
                ('living_now', models.CharField(choices=[['Afghanistan', 'Afghanistan'], ['Albania', 'Albania'], ['Algeria', 'Algeria'], ['American Samoa', 'American Samoa'], ['Andorra', 'Andorra'], ['Angola', 'Angola'], ['Anguilla', 'Anguilla'], ['Antarctica', 'Antarctica'], ['Antigua & Barbuda', 'Antigua & Barbuda'], ['Arab League', 'Arab League'], ['Argentina', 'Argentina'], ['Armenia', 'Armenia'], ['Aruba', 'Aruba'], ['Australia', 'Australia'], ['Austria', 'Austria'], ['Azerbaijan', 'Azerbaijan'], ['Bahamas', 'Bahamas'], ['Bahrain', 'Bahrain'], ['Bangladesh', 'Bangladesh'], ['Barbados', 'Barbados'], ['Belarus', 'Belarus'], ['Belgium', 'Belgium'], ['Belize', 'Belize'], ['Benin', 'Benin'], ['Bermuda', 'Bermuda'], ['Bhutan', 'Bhutan'], ['Bolivia', 'Bolivia'], ['Bosnia & Herzegovina', 'Bosnia & Herzegovina'], ['Botswana', 'Botswana'], ['Brazil', 'Brazil'], ['Brunei', 'Brunei'], ['Bulgaria', 'Bulgaria'], ['Burkina Faso', 'Burkina Faso'], ['Burundi', 'Burundi'], ['CARICOM', 'CARICOM'], ['CIS', 'CIS'], ['Cambodja', 'Cambodja'], ['Cameroon', 'Cameroon'], ['Canada', 'Canada'], ['Cape Verde', 'Cape Verde'], ['Cayman Islands', 'Cayman Islands'], ['Central African Republic', 'Central African Republic'], ['Chad', 'Chad'], ['Chile', 'Chile'], ['China', 'China'], ['Colombia', 'Colombia'], ['Comoros', 'Comoros'], ['Congo-Brazzaville', 'Congo-Brazzaville'], ['Congo-Kinshasa', 'Congo-Kinshasa'], ['Cook Islands', 'Cook Islands'], ['Costa Rica', 'Costa Rica'], ['Cote dIvoire', 'Cote dIvoire'], ['Croatia', 'Croatia'], ['Cuba', 'Cuba'], ['Cyprus', 'Cyprus'], ['Czech Republic', 'Czech Republic'], ['Denmark', 'Denmark'], ['Djibouti', 'Djibouti'], ['Dominica', 'Dominica'], ['Dominican Republic', 'Dominican Republic'], ['Ecuador', 'Ecuador'], ['Egypt', 'Egypt'], ['El Salvador', 'El Salvador'], ['Equatorial Guinea', 'Equatorial Guinea'], ['Eritrea', 'Eritrea'], ['Estonia', 'Estonia'], ['Ethiopia', 'Ethiopia'], ['Faroes', 'Faroes'], ['Fiji', 'Fiji'], ['Finland', 'Finland'], ['France', 'France'], ['Gabon', 'Gabon'], ['Gambia', 'Gambia'], ['Georgia', 'Georgia'], ['Germany', 'Germany'], ['Ghana', 'Ghana'], ['Gibraltar', 'Gibraltar'], ['Greece', 'Greece'], ['Greenland', 'Greenland'], ['Grenada', 'Grenada'], ['Guadeloupe', 'Guadeloupe'], ['Guademala', 'Guademala'], ['Guam', 'Guam'], ['Guernsey', 'Guernsey'], ['Guinea', 'Guinea'], ['Guinea-Bissau', 'Guinea-Bissau'], ['Guyana', 'Guyana'], ['Haiti', 'Haiti'], ['Honduras', 'Honduras'], ['Hungary', 'Hungary'], ['Iceland', 'Iceland'], ['India', 'India'], ['Indonesia', 'Indonesia'], ['Iran', 'Iran'], ['Iraq', 'Iraq'], ['Ireland', 'Ireland'], ['Israel', 'Israel'], ['Italy', 'Italy'], ['Jamaica', 'Jamaica'], ['Japan', 'Japan'], ['Jersey', 'Jersey'], ['Jordan', 'Jordan'], ['Kazakhstan', 'Kazakhstan'], ['Kenya', 'Kenya'], ['Kiribati', 'Kiribati'], ['Kosovo', 'Kosovo'], ['Kuwait', 'Kuwait'], ['Kyrgyzstan', 'Kyrgyzstan'], ['Laos', 'Laos'], ['Latvia', 'Latvia'], ['Lebanon', 'Lebanon'], ['Lesotho', 'Lesotho'], ['Liberia', 'Liberia'], ['Libya', 'Libya'], ['Liechtenstein', 'Liechtenstein'], ['Lithuania', 'Lithuania'], ['Luxembourg', 'Luxembourg'], ['Macao', 'Macao'], ['Macedonia', 'Macedonia'], ['Madagascar', 'Madagascar'], ['Malawi', 'Malawi'], ['Malaysia', 'Malaysia'], ['Maldives', 'Maldives'], ['Mali', 'Mali'], ['Malta', 'Malta'], ['Marshall Islands', 'Marshall Islands'], ['Martinique', 'Martinique'], ['Mauritania', 'Mauritania'], ['Mauritius', 'Mauritius'], ['Mexico', 'Mexico'], ['Micronesia', 'Micronesia'], ['Moldova', 'Moldova'], ['Monaco', 'Monaco'], ['Mongolia', 'Mongolia'], ['Montenegro', 'Montenegro'], ['Montserrat', 'Montserrat'], ['Morocco', 'Morocco'], ['Mozambique', 'Mozambique'], ['Myanmar[Burma]', 'Myanmar[Burma]'], ['NATO', 'NATO'], ['Namibia', 'Namibia'], ['Nauru', 'Nauru'], ['Nepal', 'Nepal'], ['Netherlands', 'Netherlands'], ['Netherlands Antilles', 'Netherlands Antilles'], ['New Caledonia', 'New Caledonia'], ['New Zealand', 'New Zealand'], ['Nicaragua', 'Nicaragua'], ['Niger', 'Niger'], ['Nigeria', 'Nigeria'], ['North Korea', 'North Korea'], ['Northern Cyprus', 'Northern Cyprus'], ['Norway', 'Norway'], ['Oman', 'Oman'], ['Pakistan', 'Pakistan'], ['Palau', 'Palau'], ['Palestine', 'Palestine'], ['Panama', 'Panama'], ['Papua New Guinea', 'Papua New Guinea'], ['Paraguay', 'Paraguay'], ['Peru', 'Peru'], ['Philippines', 'Philippines'], ['Poland', 'Poland'], ['Portugal', 'Portugal'], ['Puerto Rico', 'Puerto Rico'], ['Qatar', 'Qatar'], ['Reunion', 'Reunion'], ['Romania', 'Romania'], ['Russian Federation', 'Russian Federation'], ['Rwanda', 'Rwanda'], ['Saint Lucia', 'Saint Lucia'], ['Samoa', 'Samoa'], ['San Marino', 'San Marino'], ['Sao Tome & Principe', 'Sao Tome & Principe'], ['Saudi Arabia', 'Saudi Arabia'], ['Senegal', 'Senegal'], ['Serbia', 'Serbia'], ['Seyshelles', 'Seyshelles'], ['Sierra Leone', 'Sierra Leone'], ['Singapore', 'Singapore'], ['Slovakia', 'Slovakia'], ['Slovenia', 'Slovenia'], ['Solomon Islands', 'Solomon Islands'], ['Somalia', 'Somalia'], ['Somaliland', 'Somaliland'], ['South Afriica', 'South Afriica'], ['South Korea', 'South Korea'], ['Spain', 'Spain'], ['Sri Lanka', 'Sri Lanka'], ['St Kitts & Nevis', 'St Kitts & Nevis'], ['St Vincent & the Grenadines', 'St Vincent & the Grenadines'], ['Sudan', 'Sudan'], ['Suriname', 'Suriname'], ['Swaziland', 'Swaziland'], ['Sweden', 'Sweden'], ['Switzerland', 'Switzerland'], ['Syria', 'Syria'], ['Tahiti[French Polinesia]', 'Tahiti[French Polinesia]'], ['Taiwan', 'Taiwan'], ['Tajikistan', 'Tajikistan'], ['Tanzania', 'Tanzania'], ['Thailand', 'Thailand'], ['Timor-Leste', 'Timor-Leste'], ['Togo', 'Togo'], ['Tonga', 'Tonga'], ['Trinidad & Tobago', 'Trinidad & Tobago'], ['Tunisia', 'Tunisia'], ['Turkey', 'Turkey'], ['Turkmenistan', 'Turkmenistan'], ['Turks and Caicos Islands', 'Turks and Caicos Islands'], ['Tuvalu', 'Tuvalu'], ['Uganda', 'Uganda'], ['Ukraine', 'Ukraine'], ['United Arab Emirates', 'United Arab Emirates'], ['United Kingdom[Great Britain]', 'United Kingdom[Great Britain]'], ['United States of America', 'United States of America'], ['Uruguay', 'Uruguay'], ['Uzbekistan', 'Uzbekistan'], ['Vanutau', 'Vanutau'], ['Vatican City', 'Vatican City'], ['Venezuela', 'Venezuela'], ['Vietnam', 'Vietnam'], ['Virgin Islands British', 'Virgin Islands British'], ['Virgin Islands US', 'Virgin Islands US'], ['Western Sahara', 'Western Sahara'], ['Yemen', 'Yemen'], ['Zambia', 'Zambia'], ['Zimbabwe', 'Zimbabwe']], max_length=40, null=True)),
                ('language', models.CharField(choices=[['ab', 'Abkhazian'], ['ach', 'Acoli'], ['ada', 'Adangme'], ['ady', 'Adyghe'], ['aa', 'Afar'], ['afh', 'Afrihili'], ['af', 'Afrikaans'], ['agq', 'Aghem'], ['ain', 'Ainu'], ['ak', 'Akan'], ['akk', 'Akkadian'], ['bss', 'Akoose'], ['akz', 'Alabama'], ['sq', 'Albanian'], ['ale', 'Aleut'], ['am', 'Amharic'], ['anp', 'Angika'], ['njo', 'Ao Naga'], ['ar', 'Arabic'], ['an', 'Aragonese'], ['arc', 'Aramaic'], ['aro', 'Araona'], ['arp', 'Arapaho'], ['arw', 'Arawak'], ['hy', 'Armenian'], ['rup', 'Aromanian'], ['frp', 'Arpitan'], ['as', 'Assamese'], ['ast', 'Asturian'], ['asa', 'Asu'], ['cch', 'Atsam'], ['av', 'Avaric'], ['ae', 'Avestan'], ['awa', 'Awadhi'], ['ay', 'Aymara'], ['az', 'Azerbaijani'], ['bfq', 'Badaga'], ['ksf', 'Bafia'], ['bfd', 'Bafut'], ['bqi', 'Bakhtiari'], ['ban', 'Balinese'], ['bal', 'Baluchi'], ['bm', 'Bambara'], ['bax', 'Bamun'], ['bjn', 'Banjar'], ['bas', 'Basaa'], ['ba', 'Bashkir'], ['eu', 'Basque'], ['bbc', 'Batak Toba'], ['bar', 'Bavarian'], ['bej', 'Beja'], ['be', 'Belarusian'], ['bem', 'Bemba'], ['bez', 'Bena'], ['bn', 'Bengali'], ['bew', 'Betawi'], ['bho', 'Bhojpuri'], ['bik', 'Bikol'], ['bin', 'Bini'], ['bpy', 'Bishnupriya'], ['bi', 'Bislama'], ['byn', 'Blin'], ['zbl', 'Blissymbols'], ['brx', 'Bodo'], ['bs', 'Bosnian'], ['brh', 'Brahui'], ['bra', 'Braj'], ['br', 'Breton'], ['bug', 'Buginese'], ['bg', 'Bulgarian'], ['bum', 'Bulu'], ['bua', 'Buriat'], ['my', 'Burmese'], ['cad', 'Caddo'], ['yue', 'Cantonese'], ['cps', 'Capiznon'], ['car', 'Carib'], ['ca', 'Catalan'], ['cay', 'Cayuga'], ['ceb', 'Cebuano'], ['chg', 'Chagatai'], ['ch', 'Chamorro'], ['ce', 'Chechen'], ['chr', 'Cherokee'], ['chy', 'Cheyenne'], ['chb', 'Chibcha'], ['cgg', 'Chiga'], ['chi', 'Chinese'], ['chp', 'Chipewyan'], ['cho', 'Choctaw'], ['cu', 'Church Slavic'], ['chk', 'Chuukese'], ['cv', 'Chuvash'], ['ksh', 'Colognian'], ['swb', 'Comorian'], ['cop', 'Coptic'], ['kw', 'Cornish'], ['co', 'Corsican'], ['cr', 'Cree'], ['mus', 'Creek'], ['hr', 'Croatian'], ['cs', 'Czech'], ['dak', 'Dakota'], ['da', 'Danish'], ['dar', 'Dargwa'], ['dzg', 'Dazaga'], ['del', 'Delaware'], ['din', 'Dinka'], ['dv', 'Divehi'], ['doi', 'Dogri'], ['dgr', 'Dogrib'], ['dua', 'Duala'], ['nl', 'Dutch'], ['dyu', 'Dyula'], ['dz', 'Dzongkha'], ['efi', 'Efik'], ['eka', 'Ekajuk'], ['elx', 'Elamite'], ['ebu', 'Embu'], ['egl', 'Emilian'], ['en', 'English'], ['myv', 'Erzya'], ['eo', 'Esperanto'], ['et', 'Estonian'], ['ee', 'Ewe'], ['ewo', 'Ewondo'], ['ext', 'Extremaduran'], ['fan', 'Fang'], ['fat', 'Fanti'], ['fo', 'Faroese'], ['fj', 'Fijian'], ['fil', 'Filipino'], ['fi', 'Finnish'], ['nl_BE', 'Flemish'], ['fon', 'Fon'], ['gur', 'Frafra'], ['fr', 'French'], ['fur', 'Friulian'], ['ff', 'Fulah'], ['gaa', 'Ga'], ['gag', 'Gagauz'], ['gl', 'Galician'], ['lg', 'Ganda'], ['gay', 'Gayo'], ['gba', 'Gbaya'], ['gez', 'Geez'], ['ka', 'Georgian'], ['de', 'German'], ['bbj', 'Ghomala'], ['glk', 'Gilaki'], ['gil', 'Gilbertese'], ['gom', 'Goan Konkani'], ['gon', 'Gondi'], ['gor', 'Gorontalo'], ['got', 'Gothic'], ['grb', 'Grebo'], ['el', 'Greek'], ['gn', 'Guarani'], ['gu', 'Gujarati'], ['guz', 'Gusii'], ['gwi', 'Gwichʼin'], ['hai', 'Haida'], ['ht', 'Haitian'], ['ha', 'Hausa'], ['haw', 'Hawaiian'], ['he', 'Hebrew'], ['hz', 'Herero'], ['hil', 'Hiligaynon'], ['hi', 'Hindi'], ['ho', 'Hiri Motu'], ['hit', 'Hittite'], ['hmn', 'Hmong'], ['hu', 'Hungarian'], ['hup', 'Hupa'], ['iba', 'Iban'], ['ibb', 'Ibibio'], ['is', 'Icelandic'], ['io', 'Ido'], ['ig', 'Igbo'], ['ilo', 'Iloko'], ['smn', 'Inari Sami'], ['id', 'Indonesian'], ['izh', 'Ingrian'], ['inh', 'Ingush'], ['iu', 'Inuktitut'], ['ik', 'Inupiaq'], ['ga', 'Irish'], ['it', 'Italian'], ['jam', 'Jamaican Creole English'], ['ja', 'Japanese'], ['jv', 'Javanese'], ['kaj', 'Jju'], ['dyo', 'Jola-Fonyi'], ['jut', 'Jutish'], ['kbd', 'Kabardian'], ['kea', 'Kabuverdianu'], ['kab', 'Kabyle'], ['kac', 'Kachin'], ['kgp', 'Kaingang'], ['kkj', 'Kako'], ['kl', 'Kalaallisut'], ['kln', 'Kalenjin'], ['xal', 'Kalmyk'], ['kam', 'Kamba'], ['kbl', 'Kanembu'], ['kn', 'Kannada'], ['kr', 'Kanuri'], ['kaa', 'Kara-Kalpak'], ['krc', 'Karachay-Balkar'], ['krl', 'Karelian'], ['ks', 'Kashmiri'], ['csb', 'Kashubian'], ['kaw', 'Kawi'], ['kk', 'Kazakh'], ['ken', 'Kenyang'], ['kha', 'Khasi'], ['km', 'Khmer'], ['kho', 'Khotanese'], ['khw', 'Khowar'], ['ki', 'Kikuyu'], ['kmb', 'Kimbundu'], ['krj', 'Kinaray-a'], ['rw', 'Kinyarwanda'], ['kiu', 'Kirmanjki'], ['bkm', 'Kom'], ['kv', 'Komi'], ['koi', 'Komi-Permyak'], ['kg', 'Kongo'], ['kok', 'Konkani'], ['ko', 'Korean'], ['kfo', 'Koro'], ['kos', 'Kosraean'], ['avk', 'Kotava'], ['khq', 'Koyra Chiini'], ['ses', 'Koyraboro Senni'], ['kpe', 'Kpelle'], ['kri', 'Krio'], ['kj', 'Kuanyama'], ['kum', 'Kumyk'], ['ku', 'Kurdish'], ['kru', 'Kurukh'], ['kut', 'Kutenai'], ['nmg', 'Kwasio'], ['ky', 'Kyrgyz'], ['quc', 'Kʼicheʼ'], ['lad', 'Ladino'], ['lah', 'Lahnda'], ['lkt', 'Lakota'], ['lam', 'Lamba'], ['lag', 'Langi'], ['lo', 'Lao'], ['ltg', 'Latgalian'], ['lv', 'Latvian'], ['lzz', 'Laz'], ['lez', 'Lezghian'], ['lij', 'Ligurian'], ['li', 'Limburgish'], ['ln', 'Lingala'], ['lt', 'Lithuanian'], ['liv', 'Livonian'], ['jbo', 'Lojban'], ['lmo', 'Lombard'], ['sli', 'Lower Silesian'], ['dsb', 'Lower Sorbian'], ['loz', 'Lozi'], ['lu', 'Luba-Katanga'], ['lua', 'Luba-Lulua'], ['lui', 'Luiseno'], ['smj', 'Lule Sami'], ['lun', 'Lunda'], ['luo', 'Luo'], ['lb', 'Luxembourgish'], ['luy', 'Luyia'], ['mde', 'Maba'], ['mk', 'Macedonian'], ['jmc', 'Machame'], ['mad', 'Madurese'], ['maf', 'Mafa'], ['mag', 'Magahi'], ['mai', 'Maithili'], ['mak', 'Makasar'], ['mgh', 'Makhuwa-Meetto'], ['kde', 'Makonde'], ['mg', 'Malagasy'], ['ms', 'Malay'], ['ml', 'Malayalam'], ['mt', 'Maltese'], ['mnc', 'Manchu'], ['man', 'Mandingo'], ['mni', 'Manipuri'], ['gv', 'Manx'], ['mi', 'Maori'], ['arn', 'Mapuche'], ['mr', 'Marathi'], ['chm', 'Mari'], ['mh', 'Marshallese'], ['mwr', 'Marwari'], ['mas', 'Masai'], ['mzn', 'Mazanderani'], ['byv', 'Medumba'], ['men', 'Mende'], ['mwv', 'Mentawai'], ['mer', 'Meru'], ['mgo', 'Metaʼ'], ['mic', 'Micmac'], ['min', 'Minangkabau'], ['xmf', 'Mingrelian'], ['mwl', 'Mirandese'], ['lus', 'Mizo'], ['moh', 'Mohawk'], ['mdf', 'Moksha'], ['ro_MD', 'Moldavian'], ['lol', 'Mongo'], ['mn', 'Mongolian'], ['mfe', 'Morisyen'], ['mos', 'Mossi'], ['mua', 'Mundang'], ['mye', 'Myene'], ['naq', 'Nama'], ['na', 'Nauru'], ['nv', 'Navajo'], ['ng', 'Ndonga'], ['nap', 'Neapolitan'], ['ne', 'Nepali'], ['new', 'Newari'], ['sba', 'Ngambay'], ['nnh', 'Ngiemboon'], ['jgo', 'Ngomba'], ['yrl', 'Nheengatu'], ['nia', 'Nias'], ['niu', 'Niuean'], ['nog', 'Nogai'], ['no', 'Norwegian'], ['nov', 'Novial'], ['nus', 'Nuer'], ['nym', 'Nyamwezi'], ['ny', 'Nyanja'], ['nyn', 'Nyankole'], ['tog', 'Nyasa Tonga'], ['nyo', 'Nyoro'], ['nzi', 'Nzima'], ['nqo', 'NʼKo'], ['oc', 'Occitan'], ['oj', 'Ojibwa'], ['or', 'Oriya'], ['om', 'Oromo'], ['osa', 'Osage'], ['os', 'Ossetic'], ['pal', 'Pahlavi'], ['pau', 'Palauan'], ['pi', 'Pali'], ['pam', 'Pampanga'], ['pag', 'Pangasinan'], ['pap', 'Papiamento'], ['ps', 'Pashto'], ['fa', 'Persian'], ['pcd', 'Picard'], ['pms', 'Piedmontese'], ['pdt', 'Plautdietsch'], ['pon', 'Pohnpeian'], ['pl', 'Polish'], ['pnt', 'Pontic'], ['pt', 'Portuguese'], ['prg', 'Prussian'], ['pa', 'Punjabi'], ['qu', 'Quechua'], ['raj', 'Rajasthani'], ['rap', 'Rapanui'], ['rar', 'Rarotongan'], ['rif', 'Riffian'], ['rgn', 'Romagnol'], ['ro', 'Romanian'], ['rm', 'Romansh'], ['rom', 'Romany'], ['rof', 'Rombo'], ['rtm', 'Rotuman'], ['rug', 'Roviana'], ['rn', 'Rundi'], ['ru', 'Russian'], ['rue', 'Rusyn'], ['rwk', 'Rwa'], ['ssy', 'Saho'], ['sah', 'Sakha'], ['saq', 'Samburu'], ['sm', 'Samoan'], ['sgs', 'Samogitian'], ['sad', 'Sandawe'], ['sg', 'Sango'], ['sbp', 'Sangu'], ['sat', 'Santali'], ['sc', 'Sardinian'], ['sas', 'Sasak'], ['saz', 'Saurashtra'], ['sco', 'Scots'], ['gd', 'Scottish Gaelic'], ['sly', 'Selayar'], ['sel', 'Selkup'], ['seh', 'Sena'], ['see', 'Seneca'], ['sr', 'Serbian'], ['sh', 'Serbo-Croatian'], ['srr', 'Serer'], ['sei', 'Seri'], ['ksb', 'Shambala'], ['shn', 'Shan'], ['sn', 'Shona'], ['ii', 'Sichuan Yi'], ['scn', 'Sicilian'], ['sid', 'Sidamo'], ['bla', 'Siksika'], ['szl', 'Silesian'], ['sd', 'Sindhi'], ['si', 'Sinhala'], ['sms', 'Skolt Sami'], ['sk', 'Slovak'], ['sl', 'Slovenian'], ['xog', 'Soga'], ['sog', 'Sogdien'], ['so', 'Somali'], ['snk', 'Soninke'], ['es', 'Spanish'], ['suk', 'Sukuma'], ['sux', 'Sumerian'], ['su', 'Sundanese'], ['sus', 'Susu'], ['sw', 'Swahili'], ['ss', 'Swati'], ['sv', 'Swedish'], ['gsw', 'Swiss German'], ['syr', 'Syriac'], ['shi', 'Tachelhit'], ['tl', 'Tagalog'], ['ty', 'Tahitian'], ['dav', 'Taita'], ['tg', 'Tajik'], ['tly', 'Talysh'], ['tmh', 'Tamashek'], ['ta', 'Tamil'], ['trv', 'Taroko'], ['twq', 'Tasawaq'], ['tt', 'Tatar'], ['te', 'Telugu'], ['ter', 'Tereno'], ['teo', 'Teso'], ['tet', 'Tetum'], ['th', 'Thai'], ['bo', 'Tibetan'], ['tig', 'Tigre'], ['ti', 'Tigrinya'], ['tem', 'Timne'], ['tiv', 'Tiv'], ['tli', 'Tlingit'], ['tpi', 'Tok Pisin'], ['tkl', 'Tokelau'], ['to', 'Tongan'], ['tkr', 'Tsakhur'], ['tsd', 'Tsakonian'], ['tsi', 'Tsimshian'], ['ts', 'Tsonga'], ['tn', 'Tswana'], ['tcy', 'Tulu'], ['tum', 'Tumbuka'], ['tr', 'Turkish'], ['tk', 'Turkmen'], ['tru', 'Turoyo'], ['tvl', 'Tuvalu'], ['tyv', 'Tuvinian'], ['tw', 'Twi'], ['kcg', 'Tyap'], ['udm', 'Udmurt'], ['uga', 'Ugaritic'], ['uk', 'Ukrainian'], ['umb', 'Umbundu'], ['ur', 'Urdu'], ['ug', 'Uyghur'], ['uz', 'Uzbek'], ['vai', 'Vai'], ['ve', 'Venda'], ['vec', 'Venetian'], ['vep', 'Veps'], ['vi', 'Vietnamese'], ['vo', 'Volapük'], ['vot', 'Votic'], ['vun', 'Vunjo'], ['vro', 'Võro'], ['wa', 'Walloon'], ['wae', 'Walser'], ['war', 'Waray'], ['was', 'Washo'], ['guc', 'Wayuu'], ['cy', 'Welsh'], ['wal', 'Wolaytta'], ['wo', 'Wolof'], ['xh', 'Xhosa'], ['yav', 'Yangben'], ['yao', 'Yao'], ['yap', 'Yapese'], ['ybb', 'Yemba'], ['yi', 'Yiddish'], ['yo', 'Yoruba'], ['zap', 'Zapotec'], ['dje', 'Zarma'], ['zza', 'Zaza'], ['zea', 'Zeelandic'], ['zen', 'Zenaga'], ['za', 'Zhuang'], ['zu', 'Zulu'], ['zun', 'Zuni']], max_length=10, null=True)),
                ('born', models.CharField(choices=[('1940-1944', '1940-1944'), ('1944-1949', '1944-1949'), ('1950-1954', '1950-1954'), ('1955-1959', '1955-1959'), ('1960-1964', '1960-1964'), ('1964-1969', '1964-1969'), ('1970-1974', '1970-1974'), ('1975-1979', '1975-1979'), ('1980-1984', '1980-1984'), ('1984-1989', '1984-1989'), ('1990-1994', '1990-1994'), ('1995-1999', '1995-1999'), ('2000-2005', '2000-2005')], max_length=10, null=True)),
                ('gender', models.CharField(choices=[('M', 'male'), ('F', 'female')], max_length=1, null=True)),
                ('education', models.CharField(choices=[('0', 'no education'), ('1', 'finished primary/elementary school'), ('2', 'finished secondary/high school'), ('3', 'received vocational qualification'), ('4', 'current undergraduate student'), ('5', "received Bachelor's degree"), ('6', "received Master's degree"), ('7', 'received Doctorate or higher')], max_length=1, null=True)),
                ('english_level', models.CharField(choices=[('0', 'low beginner'), ('1', 'high beginner'), ('2', 'low intermediate'), ('3', 'high intermediate'), ('4', 'low advanced'), ('5', 'high advanced')], max_length=1, null=True)),
                ('lived_in_english_speaking_country', models.CharField(choices=[('0', 'never'), ('1', '0-1 year'), ('2', '1-3 years'), ('3', '3-5 years'), ('4', '5-10 years'), ('5', '10+ years')], max_length=1, null=True)),
                ('consent', models.BooleanField(default=True)),
                ('sound', models.NullBooleanField()),
                ('microphone', models.NullBooleanField()),
                ('tutorial_complete', models.BooleanField(default=False)),
                ('learner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PostTalkTiming',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timings', models.CharField(blank=True, max_length=1000, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sentence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.PermSentence')),
            ],
        ),
        migrations.AddField(
            model_name='permsentence',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.Session'),
        ),
        migrations.CreateModel(
            name='Available',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_availability', models.DateTimeField()),
                ('end_availability', models.DateTimeField()),
                ('avail_group', models.ManyToManyField(default=3, to='auth.Group')),
            ],
        ),
        migrations.CreateModel(
            name='AudioFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alternatives', models.CharField(blank=True, max_length=5000, null=True)),
                ('interference', models.NullBooleanField()),
                ('clicks', models.CharField(default='[]', max_length=2000)),
                ('audio', models.FileField(upload_to='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sentence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.PermSentence')),
            ],
        ),
        migrations.CreateModel(
            name='AudioErrorCorrectionAttempt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('audio', models.FileField(upload_to='')),
                ('transcript', models.CharField(blank=True, max_length=500, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('clicks', models.CharField(blank=True, max_length=5000, null=True)),
                ('error', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.AudioError')),
            ],
        ),
        migrations.CreateModel(
            name='AudioErrorAttempt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('audio', models.FileField(upload_to='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('transcript', models.CharField(blank=True, max_length=500, null=True)),
                ('correct', models.NullBooleanField()),
                ('error', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.AudioError')),
            ],
        ),
        migrations.AddField(
            model_name='audioerror',
            name='audio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='face.AudioFile'),
        ),
    ]
