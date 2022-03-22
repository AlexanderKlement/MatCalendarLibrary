import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {EventData} from './interface/event-data';
import {formatDate} from '@angular/common';
import * as moment from 'moment';
import {Day} from './interface/day';
import {Month} from './interface/month';
import 'moment/min/locales.min';

@Component({
    selector: 'lib-ngx-calendar',
    templateUrl: './ngx-mat-calendar.component.html',
    styleUrls: [
        './ngx-mat-calendar.component.scss'
    ],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({transform: 'translateX(100%)', opacity: 0}),
                    animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 1}),
                    animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        )
    ]
})
export class NgxMatCalendarComponent implements OnInit, OnChanges, AfterViewInit {

    isSmall = false;

    today;
    currentMonth;
    currentYear;
    firstDay: number | undefined;
    daysInMonth: number | undefined;
    daysInLastMonth: number | undefined;

    //lastMonth;

    months: Month[] = [];
    weekdays: any;
    years: number[];
    actFullDate: string | undefined;

    arrTest: Day[] = [];
    arrCalendar: Day[] = [];
    eventsData: EventData[] = [];

    showChangeDate = false;
    btnAddShow = false;

    actualDay: string | undefined;
    actualMonth: string | undefined;
    actualDate: string | undefined;
    actualYear: string | undefined;

    @Input() dataSource: EventData[] = [];
    @Input() showAddButton = false;
    @Input() language = 'en';
    @Output() dayEvents = new EventEmitter();
    @Output() newEvent = new EventEmitter();

    constructor() {
        this.today = new Date();
        this.currentMonth = this.today.getMonth();
        this.currentYear = this.today.getFullYear();
        const yearOffset = 5
        this.years = [];
        for (let i = (this.currentYear - yearOffset); i++; i < (this.currentYear + yearOffset)) {
            this.years.push(i);
        }
    }

    ngOnInit() {
        this.actFullDate = formatDate(new Date(), 'yyyy. MMMM. dd', this.language);
        this.actualDate = formatDate(new Date(), 'yyyy. MMMM', this.language);
        this.actualDay = formatDate(new Date(), 'dd', this.language);
        this.actualMonth = formatDate(new Date(), 'MM', this.language);
        this.actualYear = formatDate(new Date(), 'yyyy', this.language);
        this.eventsData = this.dataSource;
        this.btnAddShow = this.showAddButton;
    }

    ngAfterViewInit(): void {
        this.resize();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.resize();
    }


    ngOnChanges() {
        this.eventsData = this.dataSource;
        this.createCalendar();
        this.changeLanguage();
    }

    createCalendar() {
        this.arrTest = [];
        this.arrCalendar = [];
        this.firstDay = new Date(this.currentYear, this.currentMonth).getUTCDay();
        this.daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
        this.daysInLastMonth = this.getDaysInMonth(
            this.currentMonth - 1,
            this.currentYear
        );
        const lmd = this.daysInLastMonth - (this.firstDay - 1);

        // Last month days
        for (let index = lmd; index <= this.daysInLastMonth; index++) {
            this.arrTest.push({
                day: index,
                month: this.currentMonth - 1,
                year: this.currentYear,
                events: []
            });
        }

        // Actual month
        for (let index = 1; index <= this.daysInMonth; index++) {
            const filterEvents = this.eventsData.filter(event => {
                return (
                    event.startDate <= new Date(this.currentYear, this.currentMonth, index + 1) &&
                    event.endDate >= new Date(this.currentYear, this.currentMonth, index)
                );
            });

            // Sorted events by date
            const arrSortedEventsByDate = filterEvents.sort((a: any, b: any) => {
                return a.startDate - b.startDate;
            });

            this.arrTest.push({
                day: index,
                month: this.currentMonth,
                year: this.currentYear,
                events: arrSortedEventsByDate
            });


        }

        for (let i = this.arrTest.length, j = 1; i < 42; i++ , j++) {
            this.arrTest.push({
                day: j,
                month: this.currentMonth + 1,
                year: this.currentYear,
                events: []
            });
        }

        for (let i = 0; i < 6; i++) {
            const arrWeek = this.arrTest.splice(0, 7);
            this.arrCalendar.concat(arrWeek);
        }

    }

    getDaysInMonth(iMonth: number, iYear: number) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    previousMonthButtonClick() {
        if (this.currentMonth === 0) {
            this.currentYear -= 1;
            this.currentMonth = 11;
        } else {
            this.currentMonth -= 1;
        }

        this.actualDate = this.creatActMonthYear();

        this.createCalendar();
    }

    nextMonthButtonClick() {
        if (this.currentMonth === 11) {
            this.currentYear += 1;
            this.currentMonth = 0;
        } else {
            this.currentMonth += 1;
        }

        this.actualDate = this.creatActMonthYear();

        this.createCalendar();
    }

    // Dialog test
    // TODO: return the selected value
    openDialog(event: any) {
        this.dayEvents.next(event);
    }


    onYearChange(event: any) {
        this.currentYear = Number(event.value);

        this.actualDate = this.creatActMonthYear();
        this.createCalendar();
    }

    onMonthChange(event: any) {
        this.currentMonth = Number(event.value);

        this.actualDate = this.creatActMonthYear();


        this.createCalendar();
    }

    creatActMonthYear() {
        return formatDate(
            new Date(this.currentYear, this.currentMonth),
            'yyyy. MMMM',
            'en'
        );
    }

    addEventClicked() {

        const testMessage = `${this.currentYear}-${this.currentMonth}-${this.actualDay}`;
        this.newEvent.next(testMessage);
    }

    private resize(): void {
        const cont = document.getElementById('cont');

        if (cont === null) {
            return;
        }

        const height = cont.offsetHeight;
        const width = cont.offsetWidth;

        // TODO: if small only show badges not all the events
        this.isSmall = height <= 500 || width <= 769;
    }


    private changeLanguage() {
        moment.locale(this.language);
        console.log('Locale set to: ' + moment.locale())
        this.months = [];
        for (let i = 0; i < 12; i++) {
            this.months.push({
                id: i,
                name: moment().set('month', i).format('MMMM'),
            })
        }
        this.weekdays = [];
        // This is a monday, to get all the weekdays:
        const monday = moment('21.03.2022', 'DD.MM.YYYY');
        for (let i = 0; i < 7; i++) {
            this.weekdays.push({
                id: i,
                name: monday.format('dddd'),
                shortName: monday.format('dd')
            });
            monday.add(1, 'days');
        }

        //TODO: remove this outputs after reviewing it
        console.log(this.months);
        console.log(this.weekdays);
    }
}
