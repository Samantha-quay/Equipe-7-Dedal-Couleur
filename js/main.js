(function () {
  'use strict';

  function initNavigation() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('menu-principal');
    if (!toggle || !nav) {
      return;
    }

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      nav.classList.toggle('is-open', isOpen);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia('(min-width: 48em)').addEventListener('change', function (event) {
      if (event.matches) {
        setOpen(false);
      }
    });
  }


  function initLightbox() {
    var dialog = document.getElementById('lightbox');
    var links = document.querySelectorAll('.gallery__link');
    if (!dialog || !links.length || typeof dialog.showModal !== 'function') {
      return;
    }

    var figure = dialog.querySelector('.lightbox__figure');
    var caption = dialog.querySelector('.lightbox__caption');
    var closeButton = dialog.querySelector('.lightbox__close');
    var lastLink = null;

    document.documentElement.classList.add('has-lightbox');

    function open(link) {
      var thumbnail = link.querySelector('img');
      var figcaption = link.closest('figure').querySelector('figcaption');
      var image = new Image();

      image.className = 'lightbox__image';
      image.alt = thumbnail ? thumbnail.alt : '';
      image.src = link.href;

      figure.insertBefore(image, caption);
      caption.textContent = figcaption ? figcaption.innerText.replace(/\s*\n\s*/g, ' · ') : '';
      lastLink = link;
      dialog.showModal();
      closeButton.focus();
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        open(link);
      });
    });

    closeButton.addEventListener('click', function () {
      dialog.close();
    });

  
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog || event.target === figure) {
        dialog.close();
      }
    });

    dialog.addEventListener('close', function () {
      var image = figure.querySelector('.lightbox__image');
      if (image) {
        image.remove();
      }
      if (lastLink) {
        lastLink.focus();
      }
    });
  }



  function initContactForm() {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('form-status');
    if (!form) {
      return;
    }


    function sendMessage() {
      return Promise.resolve();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      sendMessage(new FormData(form)).then(function () {
        form.reset();
        status.textContent = 'Votre message a bien été envoyé. Merci !';
      }).catch(function () {
        status.textContent = 'Une erreur est survenue, merci de réessayer.';
      });
    });



    form.addEventListener('input', function () {
      status.textContent = '';
    });
  }

  initNavigation();
  initLightbox();
  initContactForm();
}());
