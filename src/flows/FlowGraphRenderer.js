import Raphael from 'raphael';
import Renderer from 'graphdracula/lib/renderer/renderer';

export default class FlowGraphRenderer extends Renderer {
    canvas = null;

    constructor(element, graph, width, height) {
        super(element, graph, width, height);

        this.canvas = Raphael(this.element, this.width, this.height);

        this.lineStyle = {
            'stroke': '#6482b9',
            'stroke-width': '2px'
        }
    }

    renderGraph = (graph, width, height) => {
        this.graph = graph;

        this.canvas.clear();
        this.canvas.setViewBox(-175, 0, width, height);
        this.draw();
    };

    drawEdge(edge) {
        if (!edge.shape) {
            edge.shape = this.canvas.connection(edge.source.shape, edge.target.shape, edge.style);
            edge.source.shape.connections.push(edge.shape)
            edge.target.shape.connections.push(edge.shape)
        }
    }

    drawNode(node) {
        let color;

        switch (node.elementType) {
            case "start":
                color = '#34b59d';
                break;
            case "step":
                color = '#62b7ed';
                break;
            default:
                color = '#cccccc';
                break;
        }

        // TODO update / cache shape
        // if (node.shape) {
        //   node.shape.translate(node.point[0], node.point[1])
        //   return
        // }
        if (node.render) {
            node.shape = node.render(this.canvas, node)
        } else {
            node.shape = this.canvas.set()
            node.shape
                .push(this.canvas.ellipse(0, 0, 30, 20)
                    .attr({ stroke: color, 'stroke-width': 2, fill: color, 'fill-opacity': 1 }))
                .push(this.canvas.text(0, 0, node.label || node.id)
                    .attr({ fill: '#ffffff' }))
                .translate(node.point[0], node.point[1])
        }
        node.shape.connections = []
        // dragify(node.shape)
    }

    translate(point) {
        return [
            Math.round((point[0] - this.graph.layoutMinX) + this.radius),
            Math.round((point[1] - this.graph.layoutMinY) + this.radius),
        ];
    }
}