function getComponentText(name: string) {
    return `import React from 'react';
import style from './${name}.module.scss';

export function ${name}() {
    return (
        <div className={style.container}>
            Welcome to the ${name} component
        </div>
    );
}`;
}

function getCSSText() {
    return `.container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
}`;
}

const BASE_PATH = "src/components";

function getFullPath(path: string) {
    return `${BASE_PATH}/${path}`;
}

function fileExists(path: string) {
    const files = new Bun.Glob(path + "/*").scanSync({ onlyFiles: true });
    const dir = new Bun.Glob(path).scanSync({ onlyFiles: false });
    const filesContent = Array.from(files);
    const dirContent = Array.from(dir);

    return filesContent.length > 0 || dirContent.length > 0;
}

function createComponent(path: string) {
    if (!path) {
        console.error('Please provide a path, including the name, for the component');
        console.error('Example: bun component ParentComponent/MyComponent');
        return;
    }

    if (path.includes(' ')) {
        console.error('Please provide a path without spaces');
        return;
    }

    const name = path.split('/').pop() || path;
    const text = getComponentText(name);
    const componentPath = getFullPath(path);
    
    if (fileExists(componentPath)) {
        console.error('Component already exists at ', getFullPath(path));
        return;
    }

    const createTsx = async () => {
        const tsxPath = getFullPath(`${path}/index.tsx`);
        console.log('Creating component file at:', tsxPath);
        await Bun.write(tsxPath, text, {
            createPath: true,
        });
    }    
  
    const createScss = async () => {
        const scssPath = getFullPath(`${path}/${name}.module.scss`);
        console.log('Creating scss file at:', scssPath);
        await Bun.write(scssPath, getCSSText(), { createPath: false });
    }

    createTsx().then(createScss).then(() => {
        console.log(`Successfully added component ${name} at ${componentPath}`);
    }).catch(console.error);
}

const cmdLineArgs = process.argv.slice(2);
createComponent(cmdLineArgs[0]);
