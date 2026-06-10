
        let lastScale = window.innerWidth / 1920;
        function updateScale() {
            const canvas = document.getElementById('canvas');
            const scaler = document.getElementById('scaler');
            const headerScaler = document.getElementById('header-scaler');
            const newScale = window.innerWidth / 1920;

            if (lastScale && lastScale !== newScale) {
                const scrollRatio = window.scrollY / lastScale;
                window.scrollTo(0, scrollRatio * newScale);
            }
            lastScale = newScale;

            canvas.style.transform = `scale(${newScale})`;
            canvas.style.transformOrigin = "top left";
            canvas.style.left = "0";
            scaler.style.height = `${7260 * newScale}px`;
            if (headerScaler) {
                headerScaler.style.transform = `scale(${newScale})`;
                headerScaler.style.left = "0";
            }
        }
        window.addEventListener('resize', updateScale);
        updateScale();
    