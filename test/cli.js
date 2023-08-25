import assert from 'node:assert/strict'
import path from 'node:path'
import childProcess from 'node:child_process'
import {promisify} from 'node:util'
import test from 'node:test'

const exec = promisify(childProcess.exec)

const join = path.join

test('rehype-cli', async (t) => {
  await t.test('should show help on `--help`', async () => {
    const bin = join('packages', 'rehype-cli', 'cli.js')

    const result = await exec(bin + ' --help')

    assert.equal(
      result.stdout,
      [
        'Usage: rehype [options] [path | glob ...]',
        '',
        '  CLI to process HTML with rehype',
        '',
        'Options:',
        '',
        '      --[no-]color                        specify color in report (on by default)',
        '      --[no-]config                       search for configuration files (on by default)',
        '  -e  --ext <extensions>                  specify extensions',
        '      --file-path <path>                  specify path to process as',
        '  -f  --frail                             exit with 1 on warnings',
        '  -h  --help                              output usage information',
        '      --[no-]ignore                       search for ignore files (on by default)',
        '  -i  --ignore-path <path>                specify ignore file',
        '      --ignore-path-resolve-from cwd|dir  resolve patterns in `ignore-path` from its directory or cwd',
        '      --ignore-pattern <globs>            specify ignore patterns',
        '      --inspect                           output formatted syntax tree',
        '  -o  --output [path]                     specify output location',
        '  -q  --quiet                             output only warnings and errors',
        '  -r  --rc-path <path>                    specify configuration file',
        '      --report <reporter>                 specify reporter',
        '  -s  --setting <settings>                specify settings',
        '  -S  --silent                            output only errors',
        '      --silently-ignore                   do not fail when given ignored files',
        '      --[no-]stdout                       specify writing to stdout (on by default)',
        '  -t  --tree                              specify input and output as syntax tree',
        '      --tree-in                           specify input as syntax tree',
        '      --tree-out                          output syntax tree',
        '  -u  --use <plugins>                     use plugins',
        '      --verbose                           report extra info for messages',
        '  -v  --version                           output version number',
        '  -w  --watch                             watch for changes and reprocess',
        '',
        'Examples:',
        '',
        '  # Process `input.html`',
        '  $ rehype input.html -o output.html',
        '',
        '  # Pipe',
        '  $ rehype < input.html > output.html',
        '',
        '  # Rewrite all applicable files',
        '  $ rehype . -o',
        ''
      ].join('\n')
    )
  })

  await t.test('should show version on `--version`', async () => {
    const bin = join('packages', 'rehype-cli', 'cli.js')

    const result = await exec(bin + ' --version')

    assert.match(result.stdout, /rehype: \d+\.\d+\.\d+/)

    assert.match(result.stdout, /rehype-cli: \d+\.\d+\.\d+/)
  })
})
