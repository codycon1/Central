<template>
    <div class="page-container">
      <main class="main-card">
          <div class="card-content">    
            <div class="welcome-section">
              <h2 class="welcome-title">Home Network Topology</h2>
              <p class="welcome-subtitle">Below is a topology of my home network, including my router, modem, and connected devices</p>
            </div>
          </div>
            <div class="feature-cards">
              <div class="network-topology-container">
                <div class="topology-chart">
                  <svg viewBox="0 0 800 650" class="network-svg">
                    <!-- Background -->
                    <rect width="800" height="650" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
                    
                    <!-- Title -->
                    <text x="400" y="30" text-anchor="middle" class="chart-title">Home Network Topology</text>
                    
                    <!-- Wireless VLAN Border -->
                    <rect x="330" y="380" width="320" height="100" rx="12" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="5,5"/>
                    <text x="490" y="375" text-anchor="middle" class="vlan-label">Wireless VLAN - SmartHome</text>
                    
                    <!-- Technical Note -->
                    <text x="490" y="390" text-anchor="middle" class="technical-note">Smart bulbs use 3rd party management via mfg apps</text>
                    <text x="490" y="403" text-anchor="middle" class="technical-note">and are isolated from the rest of the network</text>
                    
                    <!-- Dynamic Connections -->
                    <g v-for="connection in connections" :key="`connection-${connection.from}-${connection.to}`">
                      <path v-for="(segment, index) in connection.segments" :key="`${connection.from}-${connection.to}-${index}`" :d="segment" stroke="#374151" stroke-width="3" fill="none"/>
                    </g>
                    
                    <!-- Dynamic Nodes -->
                    <g v-for="node in nodes" :key="node.id" :class="`${node.type}-group`">
                      <rect 
                        :x="node.x" 
                        :y="node.y" 
                        :width="node.width" 
                        :height="node.height" 
                        rx="8" 
                        :fill="node.color" 
                        :stroke="node.strokeColor" 
                        stroke-width="2"
                      />
                      <text 
                        :x="node.x + node.width/2" 
                        :y="node.y + node.height/2 - 5" 
                        text-anchor="middle" 
                        class="device-label"
                      >
                        {{ node.label }}
                      </text>
                      <text 
                        :x="node.x + node.width/2" 
                        :y="node.y + node.height/2 + 10" 
                        text-anchor="middle" 
                        class="device-subtitle"
                      >
                        {{ node.subtitle }}
                      </text>
                    </g>
                    
                    <!-- Dynamic Legend -->
                    <g class="legend">
                      <rect 
                        :x="50" 
                        :y="380" 
                        width="250" 
                        :height="legendHeight" 
                        rx="8" 
                        fill="#f9fafb" 
                        stroke="#d1d5db" 
                        stroke-width="1"
                      />
                      <text x="175" y="405" text-anchor="middle" class="legend-title">Device Types</text>
                      
                      <!-- Dynamic Legend Items -->
                      <g v-for="(legendItem, index) in legendItems" :key="legendItem.type">
                        <rect 
                          :x="70" 
                          :y="420 + (index * 20)" 
                          width="20" 
                          height="15" 
                          rx="3" 
                          :fill="legendItem.color"
                        />
                        <text 
                          :x="100" 
                          :y="432 + (index * 20)" 
                          class="legend-text"
                        >
                          {{ legendItem.label }}
                        </text>
                      </g>
                    </g>
                    
                  </svg>
                </div>
              </div>
            </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'

  // TypeScript interfaces
  interface NetworkNode {
    id: string
    type: string
    x: number
    y: number
    width: number
    height: number
    color: string
    strokeColor: string
    label: string
    subtitle: string
  }

  interface Connection {
    from: string
    to: string
    segments: string[]
  }

  interface LegendItem {
    type: string
    color: string
    label: string
  }

  // Node data - easily modifiable to add/remove nodes
  const nodeData = ref<NetworkNode[]>([
    {
      id: 'wan',
      type: 'wan',
      x: 50,
      y: 100,
      width: 80,
      height: 50,
      color: '#3b82f6',
      strokeColor: '#1e40af',
      label: 'WAN',
      subtitle: 'Coaxial gigabit'
    },
    {
      id: 'modem',
      type: 'modem',
      x: 185,
      y: 100,
      width: 120,
      height: 50,
      color: '#10b981',
      strokeColor: '#059669',
      label: 'Nighthawk Modem',
      subtitle: 'CM-1000'
    },
    {
      id: 'router',
      type: 'router',
      x: 350,
      y: 100,
      width: 80,
      height: 50,
      color: '#f59e0b',
      strokeColor: '#d97706',
      label: 'Archer',
      subtitle: 'Ax-1500'
    },
    {
      id: 'desktop1',
      type: 'desktop',
      x: 150,
      y: 220,
      width: 80,
      height: 50,
      color: '#8b5cf6',
      strokeColor: '#7c3aed',
      label: 'Desktop PC 1',
      subtitle: 'Gaming Rig'
    },
    {
      id: 'desktop2',
      type: 'desktop',
      x: 350,
      y: 220,
      width: 80,
      height: 50,
      color: '#8b5cf6',
      strokeColor: '#7c3aed',
      label: 'Desktop PC 2',
      subtitle: 'Workstation'
    },
    {
      id: 'desktop3',
      type: 'desktop',
      x: 550,
      y: 220,
      width: 80,
      height: 50,
      color: '#8b5cf6',
      strokeColor: '#7c3aed',
      label: 'Desktop PC 3',
      subtitle: 'Media Server'
    },
     {
       id: 'wireless-ssid',
       type: 'wireless',
       x: 500,
       y: 95,
       width: 100,
       height: 60,
       color: '#ef4444',
       strokeColor: '#dc2626',
       label: 'SmartHome VLAN',
       subtitle: '192.168.20.0/20'
     },
     {
       id: 'smartbulb1',
       type: 'smartbulb',
       x: 350,
       y: 410,
       width: 70,
       height: 45,
       color: '#fbbf24',
       strokeColor: '#f59e0b',
       label: 'Smart Bulb 1',
       subtitle: '192.168.20.10'
     },
     {
       id: 'smartbulb2',
       type: 'smartbulb',
       x: 450,
       y: 410,
       width: 70,
       height: 45,
       color: '#fbbf24',
       strokeColor: '#f59e0b',
       label: 'Smart Bulb 2',
       subtitle: '192.168.20.11'
     },
     {
       id: 'smartbulb3',
       type: 'smartbulb',
       x: 550,
       y: 410,
       width: 70,
       height: 45,
       color: '#fbbf24',
       strokeColor: '#f59e0b',
       label: 'Smart Bulb 3',
       subtitle: '192.168.20.12'
     },
     {
       id: 'vlan-section',
       type: 'vlan',
       x: 490,
       y: 380,
       width: 0,
       height: 0,
       color: 'transparent',
       strokeColor: 'transparent',
       label: '',
       subtitle: ''
     }
  ])

   // Connection definitions - defines which nodes are connected
   const connectionDefinitions = ref([
     { from: 'wan', to: 'modem' },
     { from: 'modem', to: 'router' },
     { from: 'router', to: 'desktop1' },
     { from: 'router', to: 'desktop2' },
     { from: 'router', to: 'desktop3' },
     { from: 'router', to: 'wireless-ssid' },
     { from: 'wireless-ssid', to: 'vlan-section' }
   ])

   // Function to calculate connection segments between two nodes
   const calculateConnectionSegments = (fromNode: NetworkNode, toNode: NetworkNode): string[] => {
     const fromX = fromNode.x + fromNode.width
     const fromY = fromNode.y + fromNode.height / 2
     const toX = toNode.x
     const toY = toNode.y + toNode.height / 2

     // For router to desktop connections, create a hub pattern
     if (fromNode.id === 'router' && toNode.type === 'desktop') {
       const hubY = fromNode.y + fromNode.height + 30
       const hubX = fromNode.x + fromNode.width / 2
       const desktopY = toNode.y
       const desktopX = toNode.x + toNode.width / 2

       // Create separate line segments to avoid filled triangles
       return [
         `M ${hubX} ${fromY} L ${hubX} ${hubY}`,           // Vertical line down from router
         `M ${hubX} ${hubY} L ${desktopX} ${hubY}`,        // Horizontal line to desktop
         `M ${desktopX} ${hubY} L ${desktopX} ${desktopY}` // Vertical line down to desktop
       ]
     }

     // For router to wireless SSID connection
     if (fromNode.id === 'router' && toNode.id === 'wireless-ssid') {
       return [`M ${fromX} ${fromY} L ${toX} ${toY}`]
     }

     // For wireless SSID to VLAN section connection
     if (fromNode.id === 'wireless-ssid' && toNode.id === 'vlan-section') {
       const ssidRight = fromNode.x + fromNode.width // Right edge of SSID
       const ssidCenterY = fromNode.y + fromNode.height / 2 // Center Y of SSID
       const vlanY = 380 // Top of VLAN border
       const vlanRight = 650 // Right edge of VLAN border (330 + 320)
       const desktop3Right = 630 // Right edge of desktop 3 (550 + 80)
       const routingX = desktop3Right + 20 // Go right past desktop 3
       const desktop3Bottom = 270 // Bottom edge of desktop 3 (220 + 50)
       const safeY = desktop3Bottom + 20 // Safe distance below desktop 3

       return [
         `M ${ssidRight} ${ssidCenterY} L ${routingX} ${ssidCenterY}`, // Horizontal line right past desktop 3
         `M ${routingX} ${ssidCenterY} L ${routingX} ${safeY}`, // Vertical line down
         `M ${routingX} ${safeY} L ${vlanRight} ${safeY}`, // Horizontal line left to VLAN border
         `M ${vlanRight} ${safeY} L ${vlanRight} ${vlanY}`     // Vertical line down to VLAN border
       ]
     }

     // For simple horizontal connections
     return [`M ${fromX} ${fromY} L ${toX} ${toY}`]
   }

  // Computed property for connections with calculated segments
  const connections = computed<Connection[]>(() => {
    return connectionDefinitions.value.map(conn => {
      const fromNode = nodeData.value.find(node => node.id === conn.from)
      const toNode = nodeData.value.find(node => node.id === conn.to)
      
      if (!fromNode || !toNode) {
        console.warn(`Connection from ${conn.from} to ${conn.to} references non-existent node`)
        return { from: conn.from, to: conn.to, segments: [] }
      }

      return {
        from: conn.from,
        to: conn.to,
        segments: calculateConnectionSegments(fromNode, toNode)
      }
    })
  })

  // Computed property for nodes
  const nodes = computed(() => nodeData.value)

  // Computed property for dynamic legend height
  const legendHeight = computed(() => {
    const baseHeight = 50 // Title area + padding
    const itemHeight = 20 // Height per legend item
    const bottomPadding = 20 // Bottom padding
    return baseHeight + (legendItems.value.length * itemHeight) + bottomPadding
  })

   // Legend items - automatically generated from unique node types
   const legendItems = computed<LegendItem[]>(() => {
     const uniqueTypes = new Map<string, { color: string; label: string }>()
     
     nodeData.value.forEach(node => {
       // Skip invisible nodes
       if (node.type === 'vlan' || node.width === 0) {
         return
       }
       
       if (!uniqueTypes.has(node.type)) {
         let label = ''
         switch (node.type) {
           case 'wan':
             label = 'WAN/Internet Connection'
             break
           case 'modem':
             label = 'Modem/ISP Gateway'
             break
           case 'router':
             label = 'Router/WiFi Access Point'
             break
           case 'desktop':
             label = 'Desktop Computers'
             break
           case 'wireless':
             label = 'Wireless Access Point'
             break
           case 'smartbulb':
             label = 'Smart Home Devices'
             break
           default:
             label = node.type.charAt(0).toUpperCase() + node.type.slice(1)
         }
         
         uniqueTypes.set(node.type, {
           color: node.color,
           label
         })
       }
     })

     return Array.from(uniqueTypes.entries()).map(([type, data]) => ({
       type,
       color: data.color,
       label: data.label
     }))
   })

  // Function to add a new node (for future use)
  const addNode = (node: Omit<NetworkNode, 'id'>) => {
    const newNode: NetworkNode = {
      ...node,
      id: `node_${Date.now()}` // Simple ID generation
    }
    nodeData.value.push(newNode)
  }

  // Function to add a new connection (for future use)
  const addConnection = (from: string, to: string) => {
    connectionDefinitions.value.push({ from, to })
  }

  // Expose functions for external use if needed
  defineExpose({
    addNode,
    addConnection
  })
  </script>
  
  <style scoped>
  .network-topology-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  
  .topology-chart {
    width: 100%;
    height: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .network-svg {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .chart-title {
    font-size: 24px;
    font-weight: 700;
    fill: #1f2937;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .device-label {
    font-size: 11px;
    font-weight: 600;
    fill: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .device-subtitle {
    font-size: 8px;
    font-weight: 400;
    fill: rgba(255, 255, 255, 0.8);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .connection-label {
    font-size: 12px;
    font-weight: 500;
    fill: #6b7280;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .legend-title {
    font-size: 16px;
    font-weight: 600;
    fill: #1f2937;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .legend-text {
    font-size: 12px;
    font-weight: 400;
    fill: #374151;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .vlan-label {
    font-size: 14px;
    font-weight: 600;
    fill: #ef4444;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .technical-note {
    font-size: 10px;
    font-weight: 400;
    fill: #6b7280;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* Device hover effects disabled as requested */
  .wan-group, .modem-group, .router-group, .desktop-group, .wireless-group, .smartbulb-group {
    cursor: default;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .network-topology-container {
      padding: 16px;
    }
    
    .chart-title {
      font-size: 20px;
    }
    
    .device-label {
      font-size: 10px;
    }
    
    .device-subtitle {
      font-size: 7px;
    }
    
    .connection-label {
      font-size: 10px;
    }
    
    .legend-title {
      font-size: 14px;
    }
    
    .legend-text {
      font-size: 11px;
    }
    
    .vlan-label {
      font-size: 12px;
    }
    
    .technical-note {
      font-size: 9px;
    }
  }
  
  @media (max-width: 480px) {
    .network-topology-container {
      padding: 12px;
    }
    
    .chart-title {
      font-size: 18px;
    }
    
    .device-label {
      font-size: 9px;
    }
    
    .device-subtitle {
      font-size: 6px;
    }
    
    .connection-label {
      font-size: 9px;
    }
    
    .legend-title {
      font-size: 13px;
    }
    
    .legend-text {
      font-size: 10px;
    }
    
    .vlan-label {
      font-size: 11px;
    }
    
    .technical-note {
      font-size: 8px;
    }
  }
  </style>
  