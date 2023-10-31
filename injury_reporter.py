import json

POSITION_MAP = {'PG': 'Point Guard', 'SG': 'Shooting Guard', 'SF': 'Small Forward', 'PF': 'Power Forward', 'C': 'Center'}


# report file should be a json file generated from injury_scraper.py
def load_report():
    report_path = './league_report.json'

    with open(report_path, 'r') as report_file:
        if report_file:
            report = json.load(report_file)
        else:
            return None
    
    return report


def find_player_in_depth_chart(player: dict[str, str], depth_chart: dict[str, list[list[str]]]) -> tuple[str, int]:
    position = POSITION_MAP[player['Position']]
    tiered_players = depth_chart[position]

    for rank, players in enumerate(tiered_players):
        if player['Player'] in players:
            return (position, rank)

    return None


# pre-condition: player will not be in the lowest tier of the depth_chart (will always have replacements)
def find_replacements_in_depth_chart(player: tuple[str, int], depth_chart: dict[str, list[list[str]]]) -> list[str]:
    position, rank = player
    replacements = depth_chart[position][rank+1]

    return replacements


def process_report(report):
    injury_report = {}

    for team, team_data in report.items():
        injuries = team_data['Injuries']
        depth_chart = team_data['Depth Chart']
        injured_players = {player['Player'] for player in injuries}

        for player in injuries:
            position, rank = find_player_in_depth_chart(player, depth_chart)
            if rank < 2:
                replacements = find_replacements_in_depth_chart((position, rank), depth_chart)
                # remove injured players from replacements
                replacements = [replacement for replacement in replacements if replacement not in injured_players]

                # check if the backup(s) are injured as well and get further players
                if rank == 0 and not replacements:
                    replacements = find_replacements_in_depth_chart((position, rank+1), depth_chart)
                    # remove injured players from replacements
                    replacements = [replacement for replacement in replacements if replacement not in injured_players]

                injury_report[player['Player']] = {'Team': team, 'Position': f'{player["Position"]}{rank+1}', 'Replacements': replacements}
                print(f'{player["Player"]} at {position} #{rank+1} with potential replacements: {replacements}')
        
    return injury_report


def main():
    report = load_report()

    if report:
        injury_report = process_report(report)
        
        out_f_path = './injury_report.json'
        with open(out_f_path, 'w') as out_f:
            out_f.write(json.dumps(injury_report, indent=4))

        print(f'Injury report written to {out_f_path}')



if __name__ == '__main__':
    main()