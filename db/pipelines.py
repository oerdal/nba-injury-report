import pymongo
import sys
from dotenv import dotenv_values
import json

TEAM_ABBREVIATIONS = {
    'Atlanta': 'ATL',
	'Boston': 'BOS',
	'Brooklyn': 'BKN',
	'Charlotte': 'CHA',
	'Chicago': 'CHI',
	'Cleveland': 'CLE',
	'Dallas': 'DAL',
	'Denver': 'DEN',
	'Detroit': 'DET',
	'Golden St.': 'GSW',
	'Houston': 'HOU',
    'Indiana': 'IND',
	'L.A. Clippers': 'LAC',
	'L.A. Lakers': 'LAL',
	'Memphis': 'MEM',
	'Miami': 'MIA',
	'Milwaukee': 'MIL',
	'Minnesota': 'MIN',
	'New Orleans': 'NOP',
    'New York': 'NYK',
	'Oklahoma City': 'OKC',
	'Orlando': 'ORL',
	'Philadelphia': 'PHI',
	'Phoenix': 'PHX',
	'Portland': 'POR',
	'Sacramento': 'SAC',
    'San Antonio': 'SAS',
	'Toronto': 'TOR',
    'Utah': 'UTA',
	'Washington': 'WAS'
}

class MongoDBPipeline:

    def __init__(self, mongodb_uri, mongodb_db, collection):
        self.mongodb_uri = mongodb_uri
        self.mongodb_db = mongodb_db
        self.collection = collection
    

    def open_connection(self):
        self.client = pymongo.MongoClient(self.mongodb_uri)
        self.db = self.client[self.mongodb_db]

        # clear out db
        self.db[self.collection].delete_many({})


    def close_connection(self):
        self.client.close()
    

    def process_team(self, team):
        self.db[self.collection].insert_one(team)
        return team


def load_league_report():
    report_path = '../league_report.json'

    with open(report_path, 'r') as report_file:
        if report_file:
            report = json.load(report_file)
        else:
            return None
    
    return report


def daily_pipeline():
    config = dotenv_values(".env")

    DailyPipeline = MongoDBPipeline(config["ATLAS_URI"], config["DB_NAME"], "leagueDailyReport")

    DailyPipeline.open_connection()

    daily_report = load_league_report()
    if daily_report:
        for team, team_data in daily_report.items():
            team_data['Team'] = TEAM_ABBREVIATIONS[team]
            DailyPipeline.process_team(team_data)
            
    DailyPipeline.close_connection()


def main():
    daily_pipeline()


if __name__=='__main__':
    main()