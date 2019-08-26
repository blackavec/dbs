
import * as $ from 'jquery'
import { selector } from './libs/common'
import { allowedDomain, allowedDomainUrl, searchPageUri } from './libs/consts'

console.log('scrapper loaded')

try {
  $('#data').html('')
  chrome.tabs.query({active: true}, async (tabs) => {
    var tab = tabs[0];

    if (!tab.url.includes(allowedDomain)) {
      $('#data').append(`
        Allowed websites:
        <br>
        <ul>
          <li>
            <a href="${allowedDomainUrl}" target="_blank">${allowedDomainUrl}</a>
          </li>
        </ul>
      `)
      return
    }
    
    const { $src } = selector(tab.id)

    if (!tab.url.includes(searchPageUri)) {
      return $('#data').append('<h4>Nothing here to fetch.</h4>')
    }
    
    $('#data').append('<table id="data-table"></table>')
    $('#data-table').append(`
      <tr>
        <td>Lot</td>
        <td>House number</td>
        <td>Street/Block</td>
        <td>Developer's name</td>
        <td></td>
      </tr>
    `)

    const $table = $.parseHTML((await $src('#sdrTable'))[0] as string)[0]
    const $tableRow = $($table).find('tr').slice(1) as any

    $tableRow.map((i, $row) => {
      const $columns = $($row).find('td')
      const rowData = [
        $($columns[0]).text().trim(),
        $($columns[1]).text().trim(),
        $($columns[2]).text().trim(),
        $($columns[3]).text().trim()
      ]
      // console.log(columns)
      $('#data-table').append(`
        <tr>
          <td>${rowData[0]}</td>
          <td>${rowData[1]}</td>
          <td>${rowData[2]}</td>
          <td>${rowData[3]}</td>
          <td>
            <button class="import-button" data-json='${JSON.stringify(rowData)}'>Import</button>
          </td>
        </tr>
      `)
    })

    $('.import-button').click((btn) => {
      alert('now you can send this data to backend for post process:\n' + btn.target.attributes['data-json'].value)
    })
  });
}
catch (ex) {
  alert(ex);
}
