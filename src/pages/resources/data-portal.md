---
layout: ../../layouts/MarkdownLayout.astro
title: Ocean Data Portal
description: Access our collection of satellite data, algorithms, and analysis tools
author: Marine Remote Sensing Lab
date: 2024-02-20
tags: [data, resources, tools, open-science]
---

# Ocean Data Portal

Welcome to the Marine Remote Sensing Lab's Ocean Data Portal. Here you'll find access to our datasets, analysis tools, and educational resources for marine remote sensing research.

## Available Datasets

### Satellite Data Collections

We provide processed and analysis-ready satellite data from multiple missions:

#### Ocean Color Data
- **MODIS Aqua/Terra**: 2000-present, daily composites
- **Sentinel-3 OLCI**: 2016-present, 300m resolution
- **VIIRS**: 2012-present, enhanced coastal coverage
- **SeaWiFS**: Historical archive 1997-2010

#### Sea Surface Temperature
- **AVHRR**: 1981-present, long-term climate record
- **MODIS**: 2000-present, 1km resolution
- **Sentinel-3 SLSTR**: 2016-present, high accuracy
- **GOES-R**: Hourly updates, western hemisphere

#### Altimetry Data
- **Jason-3**: Sea surface height, ocean currents
- **Sentinel-6**: Latest generation altimeter
- **SWOT**: Revolutionary 2D ocean topography

### Processed Products

#### Level 3 Products
- Chlorophyll-a concentration maps
- Primary productivity estimates
- Harmful algal bloom indices
- Sea surface temperature anomalies
- Ocean current velocities

#### Time Series Data
- Regional monthly means (1997-present)
- Climate indices (ENSO, PDO, AMO)
- Phenology metrics
- Trend analyses

## Analysis Tools

### Online Processing

Access our cloud-based processing tools:

#### Algorithm Suite
```javascript
// Example API usage
const api = new MarineSensingAPI('your-api-key');

// Get chlorophyll data
const chl_data = await api.getChlorophyll({
  region: 'north-atlantic',
  dateRange: ['2024-01-01', '2024-03-31'],
  resolution: '1km'
});

// Apply custom algorithm
const result = await api.processAlgorithm({
  algorithm: 'neural-network-habs',
  data: chl_data,
  parameters: { threshold: 0.5 }
});
```

#### Available Algorithms
1. **Bio-optical Models**
   - OC4 Chlorophyll algorithm
   - GSM semi-analytical model
   - QAA quasi-analytical algorithm
   - Custom regional algorithms

2. **Pattern Detection**
   - Eddy detection and tracking
   - Front identification
   - Upwelling indices
   - Bloom detection

3. **Machine Learning Models**
   - Neural network classifiers
   - Random forest regressors
   - Deep learning segmentation
   - Time series forecasting

### Software Downloads

#### Open-Source Tools

**OceanSat Toolbox**  
*Version 2.1.0 | Released: March 2024*
- Multi-sensor data processing
- Batch processing capabilities
- GUI and command-line interface
- [Download for Windows/Mac/Linux](#)

**Marine ML Library**  
*Python Package | pip install marine-ml*
- Pre-trained models for ocean applications
- Easy integration with numpy/pandas
- Extensive documentation
- [GitHub Repository](#)

**R Ocean Remote Sensing**  
*R Package | install.packages("oceanRS")*
- Statistical analysis tools
- Visualization functions
- Time series analysis
- [CRAN Page](#)

## Data Access Methods

### Direct Download

Access data through our FTP server:
```bash
# FTP access
ftp://data.marinesensinglab.edu/public/

# Example wget command
wget -r ftp://data.marinesensinglab.edu/public/chlorophyll/2024/
```

### Web Services

#### OPeNDAP
Access data programmatically:
```python
import xarray as xr

# Open remote dataset
ds = xr.open_dataset(
    'https://data.marinesensinglab.edu/opendap/sst/monthly.nc'
)

# Select region and time
subset = ds.sel(
    lat=slice(30, 45),
    lon=slice(-80, -60),
    time='2024-01'
)
```

#### REST API
```bash
# Get data via REST API
curl -X GET \
  'https://api.marinesensinglab.edu/v1/data' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d 'product=chlorophyll' \
  -d 'date=2024-03-15' \
  -d 'format=netcdf'
```

### Cloud Computing

#### Google Earth Engine
```javascript
// Access our datasets in Earth Engine
var collection = ee.ImageCollection('MRSLAB/ocean_color/chlorophyll');
var filtered = collection.filterDate('2024-01-01', '2024-03-31');
var mean = filtered.mean();

// Visualize
Map.addLayer(mean, {min: 0, max: 10, palette: ['blue', 'green', 'yellow', 'red']});
```

## Educational Resources

### Tutorials

#### Getting Started
1. [Introduction to Ocean Remote Sensing](#)
2. [Working with NetCDF Files](#)
3. [Python for Ocean Data Analysis](#)
4. [Machine Learning Applications](#)

#### Advanced Topics
- [Algorithm Development Workshop Materials](#)
- [Time Series Analysis Techniques](#)
- [Data Fusion Methods](#)
- [Uncertainty Quantification](#)

### Video Tutorials

| Title | Duration | Level |
|-------|----------|-------|
| Ocean Color Basics | 15 min | Beginner |
| Processing MODIS Data | 30 min | Intermediate |
| Deep Learning for Ocean Applications | 45 min | Advanced |
| Building Custom Algorithms | 60 min | Advanced |

### Sample Code

Find example notebooks and scripts:
- [Jupyter Notebooks Collection](#)
- [Python Scripts Repository](#)
- [R Analysis Examples](#)
- [MATLAB Functions](#)

## Data Citation

When using our data, please cite:

> Marine Remote Sensing Laboratory (2024). Ocean Data Portal [Dataset]. 
> Marine Sensing Lab, University. https://doi.org/10.xxxxx/oceandata

### Specific Product Citations

For specific products, use the appropriate citation:
- **Chlorophyll Products**: Mitchell et al. (2023), Rem. Sens. Env.
- **SST Products**: Chen et al. (2023), J. Geophys. Res.
- **HAB Indices**: Rodriguez et al. (2024), Harmful Algae

## Terms of Use

### License
All data and tools are provided under the Creative Commons Attribution 4.0 International License (CC BY 4.0).

### Requirements
- Acknowledge the data source
- Cite appropriately in publications
- Share improvements back to community
- Report issues or errors

## Support

### Technical Support
For technical issues or questions:
- Email: data-support@marinesensinglab.edu
- Forum: [Community Support Forum](#)
- Documentation: [User Guide](#)

### FAQ

**Q: What format is the data in?**  
A: Primary format is NetCDF-4, with options for GeoTIFF, HDF5, and CSV.

**Q: How often is data updated?**  
A: Near real-time products are updated daily. Climate data records are updated monthly.

**Q: Can I access historical data?**  
A: Yes, our archive extends back to 1997 for most products, with some datasets going back to 1981.

**Q: Is there a data volume limit?**  
A: Free tier allows 100GB/month. Contact us for higher volume needs.

## Get API Access

Register for API access to integrate our data into your applications:

[Register for API Key](#) | [API Documentation](#) | [Usage Examples](#)

---

*The Ocean Data Portal is supported by NASA, NOAA, and NSF grants. We acknowledge the space agencies that provide the underlying satellite data.*