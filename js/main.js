$(document).ready(function() {
    
    $('#submitData').click(function(e) {
        e.preventDefault();
        var delimiter = $('#csvDelimiter option:selected').attr('value');
        readCsv(delimiter);
    });

    $(document).on('click', '.hideMarker', function(e) {
        $(this).closest('tr').toggleClass('displayMarker');
    });

    $('#renderMap').click(function(e) {
        e.preventDefault();
        var markers = [];
        $('#dataTable tbody tr').each(function(i, v) {
            var tr = $(this);
            if (tr.hasClass('displayMarker')) {
                var lat = tr.find('td')[$('#latitude option:selected').attr('value')];
                var lon = tr.find('td')[$('#longitude option:selected').attr('value')];
                var label = tr.find('td')[$('#label option:selected').attr('value')];
                var marker = [$(label).html(), $(lat).html(), $(lon).html()];
                markers.push(marker);
            }
        });
        renderMap(markers);
        //console.log(markers);
    });

    function readCsv(delimiter) {
        var inputData = $('#inputData').val();
        var header = inputData.slice(0, inputData.indexOf('\n'));
        var content = inputData.substring(inputData.indexOf('\n')+1);
        //console.log('header \t\t' + header);
        //console.log('delimiter \t' + delimiter);
        //console.log('content \t' + content);
        renderHeader(header, delimiter);
        renderContent(content, delimiter);
    }

    function renderHeader(header, delimiter) {
        var thead = $('#dataTable thead tr');
        var lat = $('#latitude');
        var lon = $('#longitude');
        var label = $('#label');
        var columns = header.split(delimiter);
        $.each(columns, function(i, v) {
            var td = $('<td></td>').text(v);
            var option = $('<option value="' + i + '">' + v + '</option>');
            lat.append(option);
            lon.append(option.clone());
            label.append(option.clone());
            thead.append(td);
            
        });
        var hide = $('<td></td>').text('Hide');
        thead.append(hide);
    }

    function renderContent(content, delimiter) {
        var rows = content.split('\n');
        $.each(rows, function (i, v) {
            var tr = $('<tr class="displayMarker"></tr>');
            var columns = v.split(delimiter);
            $.each(columns, function (j, c) {
                var td = $('<td></td>').text(c);
                tr.append(td);
            });
            var hide = $('<td></td>').html('<input type="checkbox" class="hideMarker">');
            tr.append(hide);
            $('#dataTable tbody').append(tr);
        });
    }

});

