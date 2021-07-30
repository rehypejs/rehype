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
          '  -h  --help                              output usage information',
          '  -v  --version                           output version number',
          '  -o  --output [path]                     specify output location',
          '  -r  --rc-path <path>                    specify configuration file',
          '  -i  --ignore-path <path>                specify ignore file',
          '  -s  --setting <settings>                specify settings',
          '  -e  --ext <extensions>                  specify extensions',
          '  -u  --use <plugins>                     use plugins',
          '  -w  --watch                             watch for changes and reprocess',
          '  -q  --quiet                             output only warnings and errors',
          '  -S  --silent                            output only errors',
          '  -f  --frail                             exit with 1 on warnings',
          '  -t  --tree                              specify input and output as syntax tree',
          '      --report <reporter>                 specify reporter',
          '      --file-path <path>                  specify path to process as',
          '      --ignore-path-resolve-from dir|cwd  resolve patterns in `ignore-path` from its directory or cwd',
          '      --ignore-pattern <globs>            specify ignore patterns',
          '      --silently-ignore                   do not fail when given ignored files',
          '      --tree-in                           specify input as syntax tree',
          '      --tree-out                          output syntax tree',
          '      --inspect                           output formatted syntax tree',
          '      --[no-]stdout                       specify writing to stdout (on by default)',
          '      --[no-]color                        specify color in report (on by default)',
          '      --[no-]config                       search for configuration files (on by default)',
          '      --[no-]ignore                       search for ignore files (on by default)',
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
