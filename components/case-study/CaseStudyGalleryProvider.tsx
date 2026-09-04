"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CaseStudyV2 } from "@/data/cbf-flo-v2-types";
import type { OnarvoDesk } from "@/data/onarvo-desk-types";
import type { CaseStudy } from "@/data/types";
import { CaseStudyImageLightbox } from "@/components/case-study/CaseStudyImageLightbox";
import {
  getCaseStudyGalleryImages,
  getCaseStudyV2GalleryImages,
  getOnarvoDeskGalleryImages,
} from "@/lib/caseStudyGallery";
import { useIsMobileViewport } from "@/hooks/useMediaQuery";

interface CaseStudyGalleryContextValue {
  images: readonly string[];
  openSrc: (src: string) => void;
  openIndex: (index: number) => void;
}

const CaseStudyGalleryContext =
  createContext<CaseStudyGalleryContextValue | null>(null);

export function useCaseStudyGallery() {
  const value = useContext(CaseStudyGalleryContext);
  if (!value) {
    throw new Error(
      "useCaseStudyGallery must be used within CaseStudyGalleryProvider",
    );
  }
  return value;
}

/** Optional hook for components that may render outside a case study page */
export function useOptionalCaseStudyGallery() {
  return useContext(CaseStudyGalleryContext);
}

interface CaseStudyGalleryProviderProps {
  study: CaseStudy;
  children: ReactNode;
}

function CaseStudyGalleryProviderInner({
  images,
  children,
}: {
  images: readonly string[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const openIndex = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= images.length) return;
      setIndex(nextIndex);
    },
    [images.length],
  );

  const openSrc = useCallback(
    (src: string) => {
      const nextIndex = images.indexOf(src);
      if (nextIndex === -1) return;
      setIndex(nextIndex);
    },
    [images],
  );

  const close = useCallback(() => setIndex(null), []);

  const safeIndex =
    index !== null && images.length > 0
      ? Math.min(index, images.length - 1)
      : null;

  const value = useMemo(
    () => ({ images, openSrc, openIndex }),
    [images, openSrc, openIndex],
  );

  return (
    <CaseStudyGalleryContext.Provider value={value}>
      {children}
      <CaseStudyImageLightbox
        images={images}
        index={safeIndex}
        onClose={close}
        onIndexChange={setIndex}
      />
    </CaseStudyGalleryContext.Provider>
  );
}

export function CaseStudyGalleryProvider({
  study,
  children,
}: CaseStudyGalleryProviderProps) {
  const isMobileViewport = useIsMobileViewport();
  const images = useMemo(
    () => getCaseStudyGalleryImages(study, isMobileViewport),
    [study, isMobileViewport],
  );

  return (
    <CaseStudyGalleryProviderInner images={images}>
      {children}
    </CaseStudyGalleryProviderInner>
  );
}

interface CaseStudyV2GalleryProviderProps {
  study: CaseStudyV2;
  children: ReactNode;
}

export function CaseStudyV2GalleryProvider({
  study,
  children,
}: CaseStudyV2GalleryProviderProps) {
  const isMobileViewport = useIsMobileViewport();
  const images = useMemo(
    () => getCaseStudyV2GalleryImages(study, isMobileViewport),
    [study, isMobileViewport],
  );

  return (
    <CaseStudyGalleryProviderInner images={images}>
      {children}
    </CaseStudyGalleryProviderInner>
  );
}

interface OnarvoDeskGalleryProviderProps {
  study: OnarvoDesk;
  children: ReactNode;
}

export function OnarvoDeskGalleryProvider({
  study,
  children,
}: OnarvoDeskGalleryProviderProps) {
  const images = useMemo(() => getOnarvoDeskGalleryImages(study), [study]);

  return (
    <CaseStudyGalleryProviderInner images={images}>
      {children}
    </CaseStudyGalleryProviderInner>
  );
}
