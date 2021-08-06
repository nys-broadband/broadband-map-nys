# Broad-band-state: Broadband Coverage Mapping for New York State

This map was created for the Summer 2021 Capstone Program at New York University's Center for Urban Science &amp; Progress.


### Team members:
Kelsey Nanan\
Aleka Raju\
AJ Kuhn


This NYU CUSP Capstone project explored the state of broadband coverage in New York State by aggregating and joining various sources of broadband speed and demographic data to provide a Broadband Score at the census tract level. Tracts with low scores (1-2) are those that we recommend for broadband investments. Below is the data dictionary for the datasets and fields that were used in the analysis and visualization. View the interactive visualization here: https://nys-broadband.github.io/broadband-map-nys/ 


Broadband Data Field | Description | Data Source
--- | --- | :---: 
M-Lab Speed | The average of upload and download speeds performed in speed tests by M-Lab servers | M-Lab
Ookla Download Speed | Average download speed of all Ookla speed tests performed in a given tract | Ookla
Ookla Upload Speed | Average upload speed of all Ookla speed tests performed in a given tract | Ookla
FCC Download Speed | Average of maximum advertised downstream speeds offered by providers in a tract for consumer service | FCC 
FCC Upload Speed | Average of maximum advertised upload speeds offered by providers in a tract for consumer service | FCC
%Pop with 25 Mbps/3 Mbps Speed | Percent of population that usees the internet at broadband speeds (defined as 25 Mbps Download Speed and 3 Mbps Upload Speed) | Microsoft US
Number of Internet Providers | Number of unique Internet Service Providers that provide service to at least one census block within the census tract | FCC 
%Households with Broadband Subscription | Percent of households with a broadband subscription | ACS 
Broadband Score | Data values in the fields above were split into quintiles and thus each census tract received a score of 1-5 based on the average of the quintile it fell into for each field. For each variable and the score itself, a lower value indicates worse performance and higher value indicates better performance. | Calculated


Demographic Data Field | Description | Data Source
--- | --- | :---: 
Population | Census tract population size | ACS
Average Household Size | Average household size per census tract | ACS
Median Household Income | Median household income per census tract | ACS
%Pop with Health Insurance | Percentage of the population within a census tract that has health insurance | ACS
%Pop 25+ with High School Degree | Percentage of the population aged 25 and above within a census tract that has a high school degree | ACS
%Pop 16+ Employed | Percentage of the population aged 16 and above within a census tract that is employed | ACS 


Fields used in Broadband Score Calculation | Description | Data Source
--- | --- | :---: 
%Pop with 25 Mbps/3 Mbps Speed | Percent of population that usees the internet at broadband speeds (defined as 25 Mbps Download Speed and 3 Mbps Upload Speed) | Microsoft US
Population | Census tract population size | ACS
M-Lab Speed | The average of upload and download speeds performed in speed tests by M-Lab servers | M-Lab
Number of M-Lab Speed Tests | Total number of M-Lab speed tests conducted per census tract (rolling 12 months) | M-Lab
Average Minimum Round Trip Time | Round trip time refers to the duration (in milliseconds) from when a browser sends a request to when it receives a response from a server. It is considered to be a performance metric for web applications | M-Lab
Average Loss Rate | Loss rate from the lifetime of the connection
Fastest Average Broadband Speed measured | Fastest Average (90th Percentile) Download Speed via M-Lab Speed Tests, rolling 12 months | Broadband Now

