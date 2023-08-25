import path from 'node:path'
import {exec} from 'node:child_process'
import test from 'tape'

const join = path.join

test('rehype-cli', (t) => {
  t.plan(2)

  t.test('should show help on `--help`', (st) => {
    const bin = join('packages', 'rehype-cli', 'cli.js')

    st.plan(2)

    exec(bin + ' --help', (error, stdout) => {
      st.ifErr(error)
      st.equal(
        stdout,
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
        ].join('\n'),
        'should show help'
      )
    })
  })

  t.test('should show version on `--version`', (st) => {
    const bin = join('packages', 'rehype-cli', 'cli.js')

    st.plan(3)

    exec(bin + ' --version', (error, stdout) => {
      st.ifErr(error)

      st.ok(
        /rehype: \d+\.\d+\.\d+/.test(stdout),
        'should include rehype version'
      )

      st.ok(
        /rehype-cli: \d+\.\d+\.\d+/.test(stdout),
        'should include rehype-cli version'
      )
    })
  })
})
