import pandas as pd

# Update this list with the actual names of your CSV files
file_names = ['FOOD-DATA-GROUP1.csv', 'FOOD-DATA-GROUP2.csv', 'FOOD-DATA-GROUP3.csv', 'FOOD-DATA-GROUP4.csv', 'FOOD-DATA-GROUP5.csv']

# Read each CSV and store them in a list
dataframes = [pd.read_csv(file) for file in file_names]

# Combine all the files together
combined_df = pd.concat(dataframes, ignore_index=True)

# Remove the first 2 columns 
# .iloc[:, 2:] means "keep all rows, and keep columns starting from index 2 to the end"
final_df = combined_df.iloc[:, 2:]

# Save the result to a new CSV file
final_df.to_csv('combined_output.csv', index=False)
print("Files combined and saved as combined_output.csv!")