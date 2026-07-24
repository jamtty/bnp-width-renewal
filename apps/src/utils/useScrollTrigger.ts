import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 플러그인 중복 등록 방지
if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch {
    // 이미 등록된 경우 무시
  }
}

interface ScrollTriggerOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  trigger?: HTMLElement | null;
  /** true면 컨테이너 자체를 애니메이션 (자식 stagger 안 함) */
  self?: boolean;
}

/**
 * GSAP ScrollTrigger 기반 페이드인-업 애니메이션 훅 (자식 요소 stagger)
 */
export function useScrollTrigger(
  fromVars: gsap.TweenVars = {},
  toVars: gsap.TweenVars = {},
  options: ScrollTriggerOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  // 옵션을 ref에 저장하여 최신 값 참조 (의존성 배열에 넣지 않음)
  const optsRef = useRef({ fromVars, toVars, options });
  optsRef.current = { fromVars, toVars, options };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ctxRef.current = gsap.context(() => {
      const children = el.children;
      const { fromVars: fv, toVars: tv, options: opt } = optsRef.current;
      // self 모드: 요소 자체를 애니메이션 (li 등 구조적 요소)
      const targets = opt.self ? el : (children.length > 0 ? children : el);

      const st: ScrollTrigger.Vars = {
        trigger: opt.trigger || el,
        start: opt.start || 'top 85%',
        end: opt.end || 'bottom 20%',
        scrub: opt.scrub || false,
        markers: opt.markers || false,
      };
      if (opt.once !== true) {
        st.toggleActions = 'restart none none none';
      }

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 60,
          ...fv,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: children.length > 1 ? 0.15 : 0,
          ...tv,
          scrollTrigger: st,
        }
      );
    }, ref);

    return () => {
      ctxRef.current?.revert();
    };
  }, []); // mount 시에만 1회 실행

  return ref;
}

/**
 * 개별 요소를 위한 ScrollTrigger (stagger 없음)
 */
export function useScrollTriggerSingle(
  fromVars: gsap.TweenVars = {},
  toVars: gsap.TweenVars = {},
  options: ScrollTriggerOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const optsRef = useRef({ fromVars, toVars, options });
  optsRef.current = { fromVars, toVars, options };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ctxRef.current = gsap.context(() => {
      const { fromVars: fv, toVars: tv, options: opt } = optsRef.current;

      const st: ScrollTrigger.Vars = {
        trigger: opt.trigger || el,
        start: opt.start || 'top 85%',
        end: opt.end || 'bottom 20%',
        scrub: opt.scrub || false,
        markers: opt.markers || false,
      };
      if (opt.once !== true) {
        st.toggleActions = 'restart none none none';
      }

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          ...fv,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          ...tv,
          scrollTrigger: st,
        }
      );
    }, ref);

    return () => {
      ctxRef.current?.revert();
    };
  }, []); // mount 시에만 1회 실행

  return ref;
}

export default useScrollTrigger;
