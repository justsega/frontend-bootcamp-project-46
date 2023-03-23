### Hexlet tests and linter status:
[![Actions Status](https://github.com/justsega/frontend-bootcamp-project-46/workflows/hexlet-check/badge.svg)](https://github.com/justsega/frontend-bootcamp-project-46/actions) [![Build CI](https://github.com/justsega/frontend-bootcamp-project-46/actions/workflows/build%20CI.yml/badge.svg)](https://github.com/justsega/frontend-bootcamp-project-46/actions/workflows/build%20CI.yml)[![Test Coverage](https://api.codeclimate.com/v1/badges/b7b5414664122e66e6c5/test_coverage)](https://codeclimate.com/github/justsega/frontend-bootcamp-project-46/test_coverage)

# Проект вычислитель отличий

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

**Возможности утилиты:**

* Поддержка разных входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

## Пример использования:

### Генерация отчета в виде 'stylish':

```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }

```
### Генерация отчета в виде 'plain':

```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]

```