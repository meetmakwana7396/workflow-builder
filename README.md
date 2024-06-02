## Drag & Drop Workflow Builder

### Project Description

The Drag & Drop Workflow Builder application allows users to create, edit, and visualize complex workflows through an intuitive drag-and-drop interface. Users can add various types of nodes representing different operations (e.g., filter, find, reduce, map, array methods) onto a canvas and draw connections between them to define the workflow logic.

This tool is designed to handle dynamic operations on large datasets, including multiple CSV files that may contain millions of records. Users can perform various operations on the data and view the final results on their selected CSV files.

### Features
- **Drag and Drop Interface**: Easily create and arrange workflow nodes on a canvas.
- **Node Types**: Support for various data operations including filter, sort, map, slice, and array methods.
- **Dynamic Data Operations**: Perform operations on large datasets efficiently.
- **CSV Support**: Import and process CSV files with millions of records.
- **Visualization**: Visualize the output data in table format.

### Technologies Used
- **Next.js**: React framework for server-side rendering and building static web applications.
- **Reactflow**: For building node-based editor and interactive diagrams.
- **Papaparse**: For parsing CSV files.
- **Redux**: For state management.
- **Tailwind CSS**: For styling the application.

### Installation Guide

Follow these steps to set up the project locally:

#### Prerequisites
- **Node.js** (>= 20.x)
- **npm**
- **Git**

#### Clone the Repository
First, clone the repository from GitHub:
```bash
git clone https://github.com/meetmakwana7396/workflow-builder.git
cd workflow-builder
```

#### Install Dependencies
Install the required dependencies using npm or yarn:
```bash
npm install
```

#### Running the Application
To run the application in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

#### Building for Production
To build the application for production:
```bash
npm run build
```
This will create an optimized production build in the `.next` folder.

To start the production server:
```bash
npm start
```

### Usage

1. **Upload CSV Files**: Begin by uploading your CSV files through the provided interface.
2. **Create Workflows**: Drag and drop different nodes onto the canvas to create your workflow. Connect the nodes to define the data processing steps.
3. **Execute Workflow**: Once your workflow is defined, execute it to process the data and view the results.
4. **Visualize Results**: The results of the data processing can be visualized directly within the application.
