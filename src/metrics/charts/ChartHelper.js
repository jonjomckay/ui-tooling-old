import MetricsConfig from '../MetricsConfig';

export default class ChartHelper {
    static createData(type, labels, datasetData) {
        let creator;

        switch (type) {
            case 'bar':
                creator = ChartHelper.createBarData;
                break;
            case 'line':
                creator = ChartHelper.createLineData;
                break;
            case 'pie':
                creator = ChartHelper.createPieData;
                break;
            default:
                console.log('An unsupported chart type of "' + type + '" was given');
        }

        return creator(labels, datasetData);
    }

    static createBarData(labels, datasetData) {
        return {
            labels: labels,
            datasets: ChartHelper.createDatasets(datasetData)
        }
    }

    static createLineData(labels, datasetData) {
        return {
            labels: labels,
            datasets: ChartHelper.createDatasets(datasetData)
        }
    }

    static createPieData(labels, datasetData) {
        const datasets = datasetData.map(data => ({
            backgroundColor: MetricsConfig.defaultColors,
            hoverBackgroundColor: MetricsConfig.defaultColors,
            label: data.tenant,
            data: data.points,
        }));

        return {
            labels: labels,
            datasets: datasets
        };
    }

    static createDatasets(datasetData) {
        // Merge the default options with the dataset-specific data
        return datasetData.map(data => Object.assign({
            label: data.tenant,
            data: data.points
        }, MetricsConfig.defaultDatasetOptions));
    }
}