import json
import os

def create_file_structure_dict(startpath):
    data = {}

    for root, dirs, files in os.walk(startpath):
        for dir in dirs:
            if dir not in data:
                data[dir] = {}
        for name in files:
            parents = root.split("/")
            parents.pop(0) # remove the first directory json
            #print(parents)
            #k = data
            for p in parents:
                print(p)
                if p not in data:
                    print("not in")
                    print(p)
                    #k[p] = {}
                    #k = k[p]

            file_key = name.split(".")[0]
            full_path = os.path.join(root, name)
            #parent_dir = os.path.basename(root)
            #if parent_dir not in data:
            #    data[parent_dir] = {}
            f = open(full_path)
            #k[file_key] = json.load(f)

            #print(root)
            #parents = root.split("/")
            #print(parents)
            #k = data
            #for p in parents:
            #    if p != "json":
            #        if p not in k:
            #            k[p] = {}
            #            k = k[p]

    return data


def save_file_structure_to_json(startpath, output_file):
    file_structure_dict = create_file_structure_dict(startpath)
    with open(output_file, 'w') as json_file:
        json.dump(file_structure_dict, json_file, indent=4)


directory_path = 'json'
output_file = 'react/ciso-game/src/data.json'
save_file_structure_to_json(directory_path, output_file)