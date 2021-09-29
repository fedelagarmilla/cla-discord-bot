# sales-discord-twitter-bot

Opensea sales discord and twitter bot.

To set up the bot

Some of the code to post on twitter is based on: https://github.com/dsgriffin/opensea-sales-twitter-bot

You can find how to set up the twitter developer account following the steps in the description

The code requires some environment variables to be set which define the collection name, twitter bot params and discord bot info:


Opensea:
OPENSEA_COLLECTION_SLUG - collection name in opensea (path at the end of the url for the opensea collection)

Discord:
DISCORD_BOT_TOKEN
DISCORD_SALES_CHANNEL_ID 

Twitter Developer App's info:
CONSUMER_KEY
CONSUMER_SECRET
ACCESS_TOKEN_KEY
ACCESS_TOKEN_SECRET

To avoid posting duplicates (opensea might not be reliable for date/time filtering), after getting the last sales info it will check the last posts from twitter and look for duplicates. If it is not a duplicate then it will post to twitter and discord.

