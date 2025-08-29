import { Graph } from "@antv/x6";
import dagre from "dagre";

export enum DeviceTypeEnum {
  "视频类设备" = 1,
  "网络设备",
  "应用服务设备",
  "安全及运维设备",
  "网络打印机",
  "BYOD设备",
}
export enum DeviceColorEnum {
  "视频类设备" = "rgb(164, 107, 245)",
  "网络设备" = "rgb(255, 178, 0)",
  "应用服务设备" = "rgb(255, 140, 8)",
  "安全及运维设备" = "rgb(231, 88, 150)",
  "网络打印机" = "rgb(0, 196, 161)",
  "BYOD设备" = "rgb(25, 165, 239)",
}
export enum DeviceIconEnum {
  "视频类设备" = "icon-shipinleishebei",
  "网络设备" = "icon-wangluoshebei",
  "应用服务设备" = "icon-yingyongfuwuqi",
  "安全及运维设备" = "icon-anquanjiyunweishebei",
  "网络打印机" = "icon-wangluodayinji",
  "BYOD设备" = "icon-BOYD",
}

// 自定义边
export const registerEdge = () => {
  Graph.registerEdge(
    "custom-edge-label",
    {
      inherit: "edge",
      attrs: {
        line: {
          strokeWidth: 2,
          stroke: "#A2B1C3",
          sourceMarker: null,
          targetMarker: null,
        },
      },
      defaultLabel: {
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          {
            tagName: "text",
            selector: "label",
          },
        ],
        attrs: {
          label: {
            fill: "#cadaf0",
            fontSize: 14,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            pointerEvents: "none",
          },
          body: {
            ref: "label",
            fill: "#2c3e56",
            stroke: "#344763",
            strokeWidth: 2,
            rx: 4,
            ry: 4,
            refWidth: "160%",
            refHeight: "120%",
            refX: "-30%",
            refY: "-10%",
          },
        },
        position: {
          distance: -50,
          options: {
            absoluteDistance: true,
            reverseDistance: true,
          },
        },
      },
    },
    true
  );
};

/**
 * 创建连线
 * @param graph
 * @param source
 * @param target
 * @returns
 */
export function createEdge(graph, source: Cell, target: Cell, info) {
  return graph.createEdge({
    shape: "custom-edge-label",
    source: { cell: source.id },
    target: { cell: target.id },
    labels: [
      {
        attrs: {
          text: { text: info?.relationTypeName },
        },
      },
    ],
  });
}

/**
 * 布局
 * @param graph
 * @param dir
 */
export const layout = (graph, dir) => {
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: dir, nodesep: 30, ranksep: 140 });
  g.setDefaultEdgeLabel(() => ({}));

  const width = 380;
  const height = 70;
  nodes.forEach((node) => {
    g.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    const source = edge.getSource();
    const target = edge.getTarget();
    g.setEdge(source.cell, target.cell);
  });

  dagre.layout(g);

  g.nodes().forEach((id) => {
    const node = graph.getCellById(id) as Node;
    if (node) {
      const pos = g.node(id);
      node.position(pos.x, pos.y);
    }
  });

  edges.forEach((edge) => {
    const source = edge.getSourceNode()!;
    const target = edge.getTargetNode()!;
    const sourceBBox = source.getBBox();
    const targetBBox = target.getBBox();

    if ((dir === "LR" || dir === "RL") && sourceBBox.y !== targetBBox.y) {
      const gap =
        dir === "LR"
          ? targetBBox.x - sourceBBox.x - sourceBBox.width
          : -sourceBBox.x + targetBBox.x + targetBBox.width;
      const fix = dir === "LR" ? sourceBBox.width : 0;
      const x = sourceBBox.x + fix + gap / 2;
      edge.setVertices([
        { x: x - 40, y: sourceBBox.center.y },
        { x: x - 40, y: targetBBox.center.y },
      ]);
    } else if (
      (dir === "TB" || dir === "BT") &&
      sourceBBox.x !== targetBBox.x
    ) {
      const gap =
        dir === "TB"
          ? targetBBox.y - sourceBBox.y - sourceBBox.height
          : -sourceBBox.y + targetBBox.y + targetBBox.height;
      const fix = dir === "TB" ? sourceBBox.height : 0;
      const y = sourceBBox.y + fix + gap / 2;
      edge.setVertices([
        { x: sourceBBox.center.x, y },
        { x: targetBBox.center.x, y },
      ]);
    } else {
      edge.setVertices([]);
    }
  });
};
