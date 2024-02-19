import json
import os

def create_file_structure_dict(startpath):
    data = {}

    for root, dirs, files in os.walk(startpath):
        for name in files:
            key = name.split(".")[0]
            full_path = os.path.join(root, name)
            parent_dir = os.path.basename(root)
            if parent_dir not in data:
                data[parent_dir] = {}
            f = open(full_path)
            data[parent_dir][key] = json.load(f)

    return data


def save_file_structure_to_json(startpath, output_file):
    file_structure_dict = create_file_structure_dict(startpath)
    with open(output_file, 'w') as json_file:
        json.dump(file_structure_dict, json_file, indent=4)


directory_path = 'json'
output_file = 'react/ciso-game/src/data.json'
save_file_structure_to_json(directory_path, output_file)