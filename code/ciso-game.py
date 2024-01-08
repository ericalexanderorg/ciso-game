import os
import json

def selection_error(max):
    error = "Invalid input. Please enter only a number within the range of selections above."
    print(error)
    return select_number(max)

def select_number(max):
    choice = input()
    try:
        choice = int(choice)
        if choice <= max:
            return choice
        else:
            return selection_error(max)
    except:
       return selection_error(max)

def clear_screen():
   os.system('cls' if os.name == 'nt' else 'clear')

def get_json_files(directory):
   return [pos_json for pos_json in os.listdir(directory) if pos_json.endswith('.json')]

def get_directories(directory):
   return [pos_json for pos_json in os.listdir(directory)]

def select_file(directory, investments=[]):
    # Load company names to choose from
    files = get_json_files(directory)
    options = {}
    for i, filename in enumerate(files, 1):
        with open(os.path.join(directory, filename), 'r') as file:
            option = json.load(file)
            options[i] = option['description']

    for i in options:
        print(f'{i}: {options[i]}')

    # prompt for numerical choice
    max_choices = len(options.keys())
    choice = select_number(max_choices)

    # prevent duplicate selection
    if options[i] in investments:
        print(f"You have already selected {options[i]}. Please make another selection")
        choice = select_number(max_choices)

    # return the filename in the directory
    if choice is 0:
        return "r"
    else:
        return files[choice - 1]

def select_directory(directory_to_list):
    areas = {}
    directories = get_directories(directory_to_list)
    for i, directory in enumerate(directories, 1):
        areas[i] = directory
        print(f'{i}: {directory}')
    max_choices = len(directories)
    choice = select_number(max_choices)
    return directories[choice - 1]

def invested(company_data):
    annual_fixed_cost = company_data['metrics']['business']['securityCosts']['dollarsAnnually']['fixed']
    engineer_count = company_data['metrics']['business']['employeesEngineering']
    non_engineer_count = company_data['metrics']['business']['employeesNonEngineering']
    customer_count = company_data['metrics']['business']['customerCount']
    cost_per_engineer = company_data['metrics']['business']['securityCosts']['dollarsAnnually']['perEngineer']
    cost_per_non_engineer = company_data['metrics']['business']['securityCosts']['dollarsAnnually']['perNonEngineer']
    cost_per_customer = company_data['metrics']['business']['securityCosts']['dollarsAnnually']['perNonEngineer']

    engineering_cost = engineer_count * cost_per_engineer
    non_engineering_cost = non_engineer_count * cost_per_non_engineer
    customer_cost = customer_count * cost_per_customer

    return annual_fixed_cost + engineering_cost + non_engineering_cost + customer_cost

def update_dict(old, new):
    for key in new:
        if isinstance(new[key], dict): 
           # hit a nested dictionary
           old[key] = update_dict(old[key], new[key])
        elif "ImpactDescription" not in key:
            try:
                old[key] += new[key]
            except:
                print(f'could not update {key}')
    
    return old
    
def process_investment(company_data, investment_area, file_name):
    with open(os.path.join('../json/investment-areas/', investment_area, file_name), 'r') as file:
       investment_data = json.load(file)

    company_data['investments'].append(file_name)

    return update_dict(company_data, investment_data)

def main():
    company_data = {}

    clear_screen()
    prompt = """Welcome to the CISO game!

CISOs are in high demand. You've received offers from the following companies. 

Enter the corresponding number for the company you'd like to start working for. 

"""
    print(prompt)
    company_file_name = select_file('../json/companies')
    with open(os.path.join('../json/companies', company_file_name), 'r') as file:
       company_data = json.load(file)

    clear_screen()
    print(company_data['firstDayPrompt'])
    print("")
    budget = company_data['metrics']['business']['annualSecurityBudget']
    spent = invested(company_data)
    remaining = budget - spent
    while spent < budget:
        print(company_data['metrics']['security']['fashion'])
        print(f"Select from one of the following areas to invest in. You have spent {remaining} of your {budget} budget to spend")
        print("")
        investment_area = select_directory('../json/investment-areas')

        #clear_screen()
        print(f"Select from the following choices in the area of {investment_area}")
        print("")
        file_name = select_file(f'../json/investment-areas/{investment_area}', company_data['investments'])
        if file_name is "r":
            # return to area selection without making an investment selection
            clear_screen()
            continue
        company_data = process_investment(company_data, investment_area, file_name)
        budget = company_data['metrics']['business']['annualSecurityBudget']
        spent = invested(company_data)
        remaining = budget - spent
        #clear_screen()

if __name__ == "__main__":
   main()
