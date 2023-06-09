import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('home <=> form', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    transformOrigin: 'right'
                })
            ], { optional: true }),
            query(':enter', [
                style({ transform: 'translateX(100%)' })
            ], { optional: true }),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
                query(':enter', [
                    animate('300ms ease-out', style({ transform: 'translateX(0)' }))
                ], { optional: true })
            ])
        ]),
        transition('register <=> home', [
            style({ position: 'relative', overflow: 'hidden', height: '100%' }),
            // Define the animations for the transition
            animate('500ms ease-in-out', style({ opacity: 0 })),
            animate('500ms ease-in-out', style({ opacity: 1 }))
        ]),
        transition('* <=> *', [
            style({
                position: 'relative',
                overflow: 'hidden',
                height: '100%'
            }),
            // Define the animations for the transition
            animate('500ms ease-in-out', style({
                transform: 'translateY(100%)',
                opacity: 0
            })),
            animate('500ms ease-in-out', style({
                transform: 'translateY(0)',
                opacity: 1
            }))
        ]),
    ]);
