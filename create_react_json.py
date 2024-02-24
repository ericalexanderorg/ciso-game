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
    file_structure_dict = dir_to_dict(startpath)
    with open(output_file, 'w') as json_file:
        json.dump(file_structure_dict, json_file, indent=4)


directory_path = 'json'
output_file = 'react/ciso-game/src/data.json'
save_file_structure_to_json(directory_path, output_file)
