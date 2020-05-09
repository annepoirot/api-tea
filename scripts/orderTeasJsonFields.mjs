import fs from 'fs'
import path from 'path'
import { settings } from './_lib'

const yamlFields = settings.yamlFiles.teas.fields

const jsonFile = path.format({
    root: process.cwd(),
    dir: 'data/json',
    name: 'teas',
    ext: '.json'
})

const jsonContent = readJSON(jsonFile)

const classifyItems = jsonContent.map(item => {
    const classifyItem = {}
    yamlFields.forEach(field => (classifyItem[field] = item[field]))
    return classifyItem
})

writeJSON(jsonFile, classifyItems)

function readJSON(jsonFile) {
    try {
        return JSON.parse(fs.readFileSync(jsonFile, 'utf8'))
    } catch (e) {
        console.log(`${jsonFile} error:`, e)
    }
}

function writeJSON(jsonFile, content) {
    try {
        fs.writeFileSync(jsonFile, JSON.stringify(content, null, 2), 'utf8')
        console.info('save', jsonFile)
    } catch (e) {
        console.log(`${jsonFile} error:`, e)
    }
}
