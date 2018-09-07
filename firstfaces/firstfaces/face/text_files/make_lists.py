with open( 'countries.txt', 'r+') as f:
    
    COUNTRY_CHOICES = f.read().replace("'", '"')
    COUNTRY_CHOICES = COUNTRY_CHOICES.replace("(", "[")
    COUNTRY_CHOICES = COUNTRY_CHOICES.replace(")", "]")
    f.write(COUNTRY_CHOICES)

# with open( 'languages.txt', 'r+') as f:
    
    # LANGUAGE_CHOICES = f.read().replace("'", '"')
    # LANGUAGE_CHOICES = LANGUAGE_CHOICES.replace("(", "[")
    # LANGUAGE_CHOICES = LANGUAGE_CHOICES.replace(")", "]")
    # f.write(LANGUAGE_CHOICES)
