from bs4 import BeautifulSoup
import requests
import json

def depth_chart_table_to_dict(depth_chart_table):
    table_body = depth_chart_table.find('tbody')

    depth_chart = {}
    for row in table_body.find_all('tr'):
        columns = row.find_all('td')
        
        position = columns[0].string
        position_hierarchy = [[span.find('a').string for span in column.find_all('span', class_='CellPlayerName--long')] for column in columns[1:]]
        depth_chart[position.strip()] = position_hierarchy
    
    return depth_chart


def injuries_table_to_arr(injuries_table):
    table_headers = [th.string for th in injuries_table.find_all('th')]

    players = injuries_table.find('tbody').find_all('tr')

    injuries = []
    for player in players:
        # player name
        player_data = {}
        for header, data in zip(table_headers, player.find_all('td')):
            if data.contents:
                # has children - get the last child (should be a span)
                data = data.contents[-1]
                player_data[header.strip()] = data.string.strip()
        injuries.append(player_data)
    
    return injuries


# scrapes the cbssports injury page (since espn's requires selenium)
def generate_league_report():
    base_url = 'https://www.cbssports.com'
    injuries_url = f'{base_url}/nba/injuries/'

    res = requests.get(injuries_url)
    soup = BeautifulSoup(res.text, 'lxml')

    injury_table = soup.find('div', class_='Page-colMain')

    teams = injury_table.find_all('div', id='TableBase')

    league_report = {}
    for team in teams:
        # get the team name
        team_name = team.find('span', class_='TeamName').string

        # get the team depth chart
        team_url = team.find('h4').find('span').find('a')['href']
        team_url = f'{base_url}{team_url}'
        team_depth_chart = get_depth_chart(team_url)
        team_depth_chart = depth_chart_table_to_dict(team_depth_chart)

        # parse the table
        team_injuries = team.find('table', class_='TableBase-table')
        team_injuries = injuries_table_to_arr(team_injuries)

        league_report[team_name] = {'Injuries': team_injuries, 'Depth Chart': team_depth_chart}
        print(f'{team_name} \u2714')
        
    return league_report


# scrape the depth chart of the given team in the format 'https://www.cbssports.com/nba/teams/<TEAMCODE>/<team-name>/depth-chart/'
# returns the div containing the depth chart
def get_depth_chart(team_url: str):
    depth_chart_url = f'{team_url}depth-chart/'

    res = requests.get(depth_chart_url)
    soup = BeautifulSoup(res.text, 'lxml')

    return soup.find('table', class_='TableBase-table')


# scrapes the CBS sports NBA injury table and generates a report
# writes the report out the a file at './league_report.json' (will overwrite if one exists)
def main():
    league_report = generate_league_report()

    out_f_path = './league_report.json'
    with open(out_f_path, 'w') as out_f:
        out_f.write(json.dumps(league_report, indent=4))
    
    print(f'League report written to {out_f_path}')


if __name__=='__main__':
    main()