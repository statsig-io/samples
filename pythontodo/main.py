from statsig import statsig

import requests

import ssl
ssl._create_default_https_context = ssl._create_unverified_context


# Make the request with SSL certificate verification enabled
requests.get('https://statsigapi.net/v1/download_config_specs', verify=False)


# import requests
# from requests.packages.urllib3.exceptions import InsecureRequestWarning

# # Disable SSL certificate verification
# requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# # Make the request with verification disabled
requests.get('https://statsigapi.net/v1', verify=False)



statsig.initialize("secret-9lbe9aax4FWPyJiLrKfo8GAj1cXX2UUqoDBcG4B7rKW")
print("the sample print")


# or with StatsigOptions
