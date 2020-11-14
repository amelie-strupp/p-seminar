import {
  animate, animateChild, group, query, state, style, transition, trigger
} from '@angular/animations';

export const slideAnimation = trigger('routeAnimation', [
      transition('1=>0, 2=>1, 2=>0', [
        style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], {optional: true}),
      query(':enter', [
        style({ left: '-100%' })
      ], {optional: true}),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ],  {optional: true})
      ]),
    ]),
    transition('0=>1, 0=>2, 1=>2', [
      style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ], {optional: true}),
    query(':enter', [
      style({ right: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ right: '100%' }))
      ], {optional: true}),
      query(':enter', [
        animate('300ms ease-out', style({ right: '0%' }))
      ], {optional: true})
    ]),
  ])
    ]);
