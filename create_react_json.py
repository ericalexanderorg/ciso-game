import json
import os

def dir_to_dict(directory):
    directory_structure = {}
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isdir(item_path):
            directory_structure[item] = dir_to_dict(item_path)
        elif item.endswith('.json'):
            with open(item_path, 'r') as json_file:
                data = json.load(json_file)
            key = item.split('.')[0]
            directory_structure[key] = data
        else:
            directory_structure[item] = None
    return directory_structure

def save_file_structure_to_json(startpath, output_file):
    d = dir_to_dict(startpath)
    #d['investments']['Hiring'] = {key: d['investments']['Hiring'] for key in sorted(d.keys())}
    #sorted_hiring = {k: v for k, v in sorted(d['investments']['Hiring'].items(), key=lambda item: item[1]['metrics']['business']['securityCosts']['dollarsAnnually']['fixed'])}
    #d['investments']['Hiring'] = sorted(d['investments']['Hiring'].items())
    d['investments']['Hiring'] = {k: v for k, v in sorted(d['investments']['Hiring'].items())}
    with open(output_file, 'w') as json_file:
        json.dump(d, json_file, indent=4)


directory_path = 'json'
output_file = 'react/ciso-game/src/data.json'
save_file_structure_to_json(directory_path, output_file)
